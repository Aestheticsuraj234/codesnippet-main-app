"use server";
import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";

export const getProgressForAllTechnologies = async () => {
  const user = await currentUser();

  if (!user) {
    return [];
  }

  const technologies = await db.technology.findMany({
    where: {
      status: "PUBLISHED",
    },
    select: {
      id: true,
      image: true,
      name: true,
      description: true,
      topics: {
        select: {
          subTopics: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  const userCompletedSubTopics = await db.markAsDone.findMany({
    where: {
      userId: user.id,
    },
    select: {
      subTopicId: true,
    },
  });

  const completedSubtopicIds = new Set(userCompletedSubTopics.map((subTopic) => subTopic.subTopicId));

  // Calculate the progress for each technology
  const progress = technologies.map((technology) => {
    const totalSubTopics = technology.topics.reduce(
      (acc, topic) => acc + topic.subTopics.length,
      0
    );

    const completedSubTopics = technology.topics.reduce(
      (acc, topic) =>
        acc +
        topic.subTopics.filter((subTopic) =>
          completedSubtopicIds.has(subTopic.id)
        ).length,
      0
    );

    return {
      technologyId: technology.id,
      progress: totalSubTopics > 0 ? Math.round((completedSubTopics / totalSubTopics) * 100) : 0, // Avoid NaN
    };
  });

  return progress;
};

export const getProgressForAllWorkshops = async () => {
  const user = await currentUser();

  if (!user) {
    return [];
  }

  const workshops = await db.workshop.findMany({
    where: {
      status: "PUBLISHED",
    },
    select: {
      id: true,
      days: {
        select: {
          id: true,
          userProgress: {
            where: {
              userId: user.id,
            },
            select: {
              markedAsDone: true,
            },
          },
        },
      },
    },
  });

  // Calculate progress for workshops
  const progress = workshops.map((workshop) => {
    const totalDays = workshop.days.length;
    const completedDays = workshop.days.filter((day) =>
      day.userProgress.some((progress) => progress.markedAsDone)
    ).length;

    return {
      workshopId: workshop.id,
      progress: totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0, // Avoid NaN
    };
  });

  return progress;
};

export const getProgressForAllCourses = async () => {
  const user = await currentUser();

  if (!user) {
    return [];
  }

  const courses = await db.courses.findMany({
    where: {
      status: "PUBLISHED",
    },
    select: {
      id: true,
      chapters: {
        select: {
          id: true,
          chapterProgression: {
            where: {
              userId: user.id,
            },
            select: {
              markedAsDone: true,
            },
          },
        },
      },
    },
  });

  // Calculate progress for courses
  const progress = courses.map((course) => {
    const totalChapters = course.chapters.length;
    const completedChapters = course.chapters.filter((chapter) =>
      chapter.chapterProgression.some((progress) => progress.markedAsDone)
    ).length;

    return {
      courseId: course.id,
      progress: totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0, // Avoid NaN
    };
  });

  return progress;
};
