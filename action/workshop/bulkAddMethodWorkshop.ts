"use server";
import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db/db'; // Adjust the import based on your file structure
import { z } from 'zod';
import { ContentStatus, ContentType } from '@prisma/client'; // Adjust the import based on your file structure
import { currentUser } from '@/lib/auth/data/auth';

// Define schemas
const DaySchema = z.object({
  title: z.string().min(1, { message: "Please enter a day title" }),
  dayNumber: z.number().min(1, { message: "Day number must be greater than 0" }),
  sourceCodeLink: z.string().optional(),
  videoLink: z.string().optional(),
  notes: z.string().optional(),
});

const WorkshopSchema = z.object({
  title: z.string().min(1, { message: "Please enter a workshop title" }),
  description: z.string().min(1, { message: "Please enter a workshop description" }),
  image: z.string().optional(),
  startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Please enter a valid start date",
  }),
  endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Please enter a valid end date",
  }),
  techStack: z.array(z.string()).optional(),
  status: z.nativeEnum(ContentStatus),
  isRecorded: z.boolean(),
  days: z.array(DaySchema).optional(),
});

export async function uploadWorkshopFile(formData: FormData) {
  const file = formData.get("file") as File;

  if (!file) {
    throw new Error("File not found");
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const uploadDir = path.join(process.cwd(), 'public/uploads');
  const filePath = path.join(uploadDir, file.name);

  try {
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(filePath, buffer);

    // Parse the file and insert into the database
    await processWorkshopFile(filePath);
  } catch (error) {
    throw new Error(`Error processing file: ${error.message}`);
  } finally {
    await fs.unlink(filePath);
  }

  revalidatePath("/");

  return {
    message: "Workshop file uploaded and processed successfully",
    filePath,
  };
}

async function processWorkshopFile(filePath: string) {
    const user = await currentUser();

    if(user?.role !== "ADMIN") {
        throw new Error("You do not have permission to perform this action");
    }
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(fileContent); // Adjust parsing based on your file format

  const workshopContent = await db.content.findFirst({
    where: {
        type: ContentType.WORKSHOPS
    }
});

if (!workshopContent) {
    throw new Error("Workshop content not found");
}

  for (const item of data) {
    const parsedData = WorkshopSchema.parse(item);

    // Create the main workshop content
    const createdWorkshop = await db.workshop.create({
      data: {
        contentId: workshopContent.id,
        title: parsedData.title,
        description: parsedData.description,
        image: parsedData.image || "",
        startDate: new Date(parsedData.startDate),
        endDate: new Date(parsedData.endDate),
        techStack: parsedData.techStack,
        status: parsedData.status,
        isRecorded: parsedData.isRecorded,
      },
    });

    // Create days associated with the workshop
    for (const day of parsedData.days) {
      await db.workshopDay.create({
        data: {
          title: day.title,
          dayNumber: day.dayNumber,
          sourceCodeLink: day.sourceCodeLink,
          videoLink: day.videoLink,
          notes: day.notes,
          workshopId: createdWorkshop.id,
        },
      });
    }
  }
}
