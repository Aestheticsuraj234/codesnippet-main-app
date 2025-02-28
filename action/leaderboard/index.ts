"use server";
import { db } from "@/lib/db/db";


export const getLeaderboardData = async () => {
  // Fetch tutorial data
  const tutorial = await db.topic.findMany({
    where: {
      status: "PUBLISHED",
    },
    select: {
      subTopics: {
        select: {
          markAsDone: {
            select: {
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
          },
        },
      },
    },
  });

  // Fetch workshop data
  const workshops = await db.workshop.findMany({
    where: {
      status: "PUBLISHED",
    },
    select: {
      days: {
        select: {
          userProgress: {
            select: {
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
              markedAsDone: true,
            },
          },
        },
      },
    },
  });

  // Fetch live courses data
  const liveCourses = await db.courses.findMany({
    where: {
      status: "PUBLISHED",
    },
    select: {
      chapters: {
        select: {
          chapterProgression: {
            select: {
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
              markedAsDone: true,
            },
          },
        },
      },
    },
  });

  // Create separate maps for tutorials, workshops, and live courses
  const tutorialPointsMap = new Map();
  const workshopPointsMap = new Map();
  const liveCoursePointsMap = new Map();

  // Helper function to add points to a user in a specific map
  const addPoints = (user: any, map: Map<any, any>, points = 150) => {
    if (!map.has(user.id)) {
      map.set(user.id, {
        id: user.id,
        name: user.name,
        image: user.image,
        points: 0,
      });
    }
    map.get(user.id).points += points;
  };

  // Calculate points for tutorials
  tutorial.forEach((topic) => {
    topic.subTopics.forEach((subTopic) => {
      subTopic.markAsDone.forEach((done) => {
        addPoints(done.user, tutorialPointsMap);
      });
    });
  });

  // Calculate points for workshops
  workshops.forEach((workshop) => {
    workshop.days.forEach((day) => {
      day.userProgress.forEach((progress) => {
        if (progress.markedAsDone) {
          addPoints(progress.user, workshopPointsMap);
        }
      });
    });
  });

  // Calculate points for live courses
  liveCourses.forEach((course) => {
    course.chapters.forEach((chapter) => {
      chapter.chapterProgression.forEach((progression) => {
        if (progression.markedAsDone) {
          addPoints(progression.user, liveCoursePointsMap);
        }
      });
    });
  });


  // Convert maps to arrays and return the structured data
  const tutorialLeaderboard = Array.from(tutorialPointsMap.values());
  const workshopLeaderboard = Array.from(workshopPointsMap.values());
  const liveCoursesLeaderboard = Array.from(liveCoursePointsMap.values());

  return {
    tutorial: tutorialLeaderboard,
    workshops: workshopLeaderboard,
    liveCourses: liveCoursesLeaderboard,
  };
};
