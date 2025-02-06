"use server";
import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db/db';
import { z } from 'zod';
import { ContentStatus } from '@prisma/client';
import { currentUser } from '@/lib/auth/data/auth';

// Define schemas
const ChapterSchema = z.object({
  title: z.string().min(1, { message: "Please enter a chapter title" }),
  description: z.string().min(1, { message: "Please enter a chapter description" }),
  chapterVideoLink: z.string().optional(),
  chapterNotes: z.string().optional(),
  sourceCodeLink: z.string().optional(),
});

const CourseSchema = z.object({
  title: z.string().min(1, { message: "Please enter a course title" }),
  description: z.string().min(1, { message: "Please enter a course description" }),
  image: z.string().optional(),
  price: z.number().min(0, { message: "Price must be greater than or equal to 0" }),
  discount: z.number().min(0).max(100).optional(),
  startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Please enter a valid start date",
  }),
  courseVideoPitchLink: z.string().optional(),
  status: z.nativeEnum(ContentStatus),
  chapters: z.array(ChapterSchema).optional(),
});

export async function uploadCourseFile(formData: FormData) {
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
    // @ts-ignore
    await fs.writeFile(filePath, buffer);
    console.log(`File written to: ${filePath}`);

    // Parse the file and insert it into the database
    await processCourseFile(filePath);
  } catch (error) {
    console.error(`Error processing file: ${(error as Error).message}`);
    throw new Error(`Error processing file: ${(error as Error).message}`);
  } finally {
    try {
      // Clean up the uploaded file after processing
      await fs.unlink(filePath);
      console.log(`Temporary file deleted: ${filePath}`);
    } catch (err) {
      console.warn(`Failed to delete temporary file: ${(err as Error).message}`);
    }
  }

  revalidatePath("/");

  return {
    message: "Course file uploaded and processed successfully",
    filePath,
  };
}

async function processCourseFile(filePath: string) {
  const user = await currentUser();

  if (user?.role !== "ADMIN") {
    throw new Error("You do not have permission to perform this action");
  }

  let fileContent;
  try {
    fileContent = await fs.readFile(filePath, 'utf-8');
    console.log("File content read successfully.");
  } catch (readError) {
    console.error(`Error reading file: ${(readError  as Error).message}`);
    throw new Error("Failed to read the uploaded file.");
  }

  let data;
  try {
    data = JSON.parse(fileContent);
    console.log("File content parsed successfully.");
  } catch (parseError) {
    console.error(`JSON Parsing Error: ${(parseError as Error).message}`);
    throw new Error("Failed to parse JSON file.");
  }

  for (const item of data) {
    try {
      const parsedData = CourseSchema.parse(item);
      console.log(`Validated course data: ${parsedData.title}`);

      // Create the main course
      const createdCourse = await db.courses.create({
        data: {
          title: parsedData.title,
          description: parsedData.description,
          image: parsedData.image || "",
          price: parsedData.price,
          discount: parsedData.discount,
          startDate: new Date(parsedData.startDate),
          courseVideoPitchLink: parsedData.courseVideoPitchLink!,
          status: parsedData.status,
        },
      });
      console.log(`Course created: ${createdCourse.id}`);

      // Create chapters associated with the course
      if (parsedData.chapters) {
        for (const chapter of parsedData.chapters) {
          const createdChapter = await db.chapter.create({
            data: {
              title: chapter.title,
              description: chapter.description,
              chapterVideoLink: chapter.chapterVideoLink || "",
              chapterNotes: chapter.chapterNotes || "",
              sourceCodeLink: chapter.sourceCodeLink || "",
              courseId: createdCourse.id,
            },
          });
          console.log(`Chapter created: ${createdChapter.id}`);
        }
      }
    } catch (validationError) {
      console.error(`Validation or Database Error: ${(validationError as Error).message}`);
      throw new Error(`Error processing course data: ${(validationError as Error) .message}`);
    }
  }
}
