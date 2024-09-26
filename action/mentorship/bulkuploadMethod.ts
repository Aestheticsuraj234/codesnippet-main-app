"use server";
import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db/db';
import { z } from 'zod';
import { currentUser } from '@/lib/auth/data/auth';

// Define schemas
const AvailableSlotSchema = z.object({
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Please enter a valid date",
  }),
  time: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Please enter a valid time",
  }),
});

const MeetingSchema = z.object({
  title: z.string().min(1, { message: "Please enter a meeting title" }),
  description: z.string().min(1, { message: "Please enter a meeting description" }),
  duration: z.number().min(1, { message: "Duration must be greater than 0" }),
  price: z.number().min(0, { message: "Price must be greater than or equal to 0" }),
  discountedPrice: z.number().min(0).optional(),
  availableSlots: z.array(AvailableSlotSchema).optional(),
});

export async function uploadMeetingFile(formData: FormData) {
  const file = formData.get("file") as File;

  if (!file) {
    throw new Error("File not found");
  }

  // Log file details for debugging
  console.log(`Received file: ${file.name} (Size: ${file.size} bytes)`);

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const uploadDir = path.join(process.cwd(), 'public/uploads');
  const filePath = path.join(uploadDir, file.name);

  try {
    // Ensure upload directory exists
    await fs.mkdir(uploadDir, { recursive: true });
    console.log(`Directory created/exists: ${uploadDir}`);

    // Save file to the server
    await fs.writeFile(filePath, buffer);
    console.log(`File written to: ${filePath}`);

    // Parse the file and insert it into the database
    await processMeetingFile(filePath);
  } catch (error) {
    console.error(`Error processing file: ${error.message}`);
    throw new Error(`Error processing file: ${error.message}`);
  } finally {
    try {
      // Clean up the uploaded file after processing
      await fs.unlink(filePath);
      console.log(`Temporary file deleted: ${filePath}`);
    } catch (err) {
      console.warn(`Failed to delete temporary file: ${err.message}`);
    }
  }

  revalidatePath("/");

  return {
    message: "Meeting file uploaded and processed successfully",
    filePath,
  };
}

async function processMeetingFile(filePath: string) {
  const user = await currentUser();

  if (user?.role !== "ADMIN") {
    throw new Error("You do not have permission to perform this action");
  }

  let fileContent;
  try {
    fileContent = await fs.readFile(filePath, 'utf-8');
    console.log("File content read successfully.");
  } catch (readError) {
    console.error(`Error reading file: ${readError.message}`);
    throw new Error("Failed to read the uploaded file.");
  }

  let data;
  try {
    data = JSON.parse(fileContent);
    console.log("File content parsed successfully.");
  } catch (parseError) {
    console.error(`JSON Parsing Error: ${parseError.message}`);
    throw new Error("Failed to parse JSON file.");
  }

  for (const item of data) {
    try {
      const parsedData = MeetingSchema.parse(item);
      console.log(`Validated meeting data: ${parsedData.title}`);

      // Create the main meeting
      const createdMeeting = await db.meeting.create({
        data: {
          title: parsedData.title,
          description: parsedData.description,
          duration: parsedData.duration,
          price: parsedData.price,
          discountedPrice: parsedData.discountedPrice,
        },
      });
      console.log(`Meeting created: ${createdMeeting.id}`);

      // Create available slots associated with the meeting
      if (parsedData.availableSlots) {
        for (const slot of parsedData.availableSlots) {
          const createdSlot = await db.availableSlot.create({
            data: {
              date: new Date(slot.date),
              time: new Date(slot.time),
              meetingId: createdMeeting.id,
            },
          });
          console.log(`Available slot created: ${createdSlot.id}`);
        }
      }
    } catch (validationError) {
      console.error(`Validation or Database Error: ${validationError.message}`);
      throw new Error(`Error processing meeting data: ${validationError.message}`);
    }
  }
}
