"use server";
import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db/db'; // Adjust the import based on your file structure
import { z } from 'zod';
import { TechnologyStatus } from '@prisma/client'; // Adjust the import based on your file structure

// Define schemas
 const SubTopicSchema = z.object({
  title: z.string().min(1, { message: "Please enter a title" }),
  videoLink: z.string().optional(),
  videoDescription: z.string().optional(),
  content: z.any().optional(),
  status: z.nativeEnum(TechnologyStatus),
});

const TopicSchema = z.object({
  title: z.string().min(1, { message: "Please enter a title" }),
  status: z.nativeEnum(TechnologyStatus),
  subTopics: z.array(SubTopicSchema).optional(),
});

 const AddTechnologySchema = z.object({
  name: z.string().min(1, { message: "Please enter a name" }),
  description: z.string().min(1, { message: "Please enter a description" }),
  status: z.nativeEnum(TechnologyStatus),
  image: z.string().optional(),
  topics: z.array(TopicSchema).optional(),
});

export async function uploadFile(formData: FormData) {
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
    // @ts-ignore
    await fs.writeFile(filePath, buffer);

    // Parse the file and insert into the database
    await processFile(filePath);
  } catch (error) {
    throw new Error(`Error processing file: ${(error as Error).message}`);
  } finally {
    await fs.unlink(filePath);
  }

  revalidatePath("/");

  return {
    message: "File uploaded and processed successfully",
    filePath,
  };
}

async function processFile(filePath: string) {
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(fileContent); // Adjust parsing based on your file format

  for (const item of data) {
    const parsedData = AddTechnologySchema.parse(item);

    // Create the main technology content
    const createdTechnology = await db.technology.create({
      data: {
        name: parsedData.name,
        description: parsedData.description,
        image: parsedData.image || "",
        status: parsedData.status,
      },
    });

    for (const topic of parsedData?.topics!) {
      const createdTopic = await db.topic.create({
        data: {
          title: topic.title,
          status: topic.status,
          technologyId: createdTechnology.id,
        },
      });

      for (const subTopic of topic?.subTopics!) {
        await db.subTopic.create({
          data: {
            title: subTopic.title,
            videoLink: subTopic.videoLink,
            videoDescription: subTopic.videoDescription,
            content: JSON.stringify(subTopic.content),
            status: subTopic.status,
            topicId: createdTopic.id,
          },
        });
      }
    }
  }
}
