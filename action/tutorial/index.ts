"use server";
import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";
import { TechnologyStatus } from "@prisma/client";

export const GetAllTopicsByTechnologyId = async (technologyId: string) => {
  const user = await currentUser();
  const topics = await db.topic.findMany({
    where: {
      technologyId: technologyId,
      status: TechnologyStatus.PUBLISHED,
    },
    orderBy: {
      createdAt: "asc",
    },
    select: {
      id: true,
      title: true,
      subTopics: {
        select: {
          id: true,
          title: true,
          markAsDone: true,
        },
      },
    },
  });

  // Map over the topics and subtopics to include the 'done' status
  const modifiedTopics = topics.map((topic) => ({
    ...topic,
    subTopics: topic.subTopics.map((subTopic) => ({
      ...subTopic,
      done: subTopic.markAsDone.some(
        (done) => done.userId === user?.id && done.subTopicId === subTopic.id
      ),
    })),
  }));

 
  return modifiedTopics;
};

export const GetTechnologyById = async (technologyId: string) => {
  const user = await currentUser();
  const technology = await db.technology.findUnique({
    where: { id: technologyId, status: TechnologyStatus.PUBLISHED },
    select: {
      isDayAssigned: {
        where: {
          userId: user?.id,
        },
        select: {
          isDayAssigned: true,
          startDate: true,
        },
      },
      topics: {
        select: {
          id: true,
          title: true,
          dayAssigned: {
            where: {
              userId: user?.id,
            },
            select: {
              dayAssigned: true,
              complettionStatus: true,
            },
          },
          subTopics: {
            select: {
              id: true,
              title: true,
              markAsDone: {
                where: {
                  userId: user?.id,
                },
                select: {
                  userId: true,
                  subTopicId: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if(!technology){
    throw new Error("Technology not found")
  }

 
  return technology;
};

export const AddDayAssingToTopic = async (
  technologyId: string,
  dayAssigned: number
) => {
  const user = await currentUser();

  if (!user || !user.id) {
    throw new Error("User not found");
  }

  // Step 1: Get the technology and its topics
  const technology = await GetTechnologyById(technologyId);

  if (!technology) {
    throw new Error("Technology not found");
  }

  // Step 2: Calculate the total number of subtopics
  const totalSubTopics = technology.topics.reduce((acc, topic) => {
    return acc + topic.subTopics.length;
  }, 0);

  if (totalSubTopics === 0) {
    throw new Error("No subtopics found in the technology");
  }

  // Step 3: Distribute the assigned days proportionally based on the subtopics count
  const updatedTopics = await Promise.all(
    technology.topics.map(async (topic) => {
      const subTopicsCount = topic.subTopics.length;
      const proportionalDays = Math.round(
        (subTopicsCount / totalSubTopics) * dayAssigned
      );

      // Create an entry in userTopicAssignment table
      await db.userTopicAssignment.create({
     
        data: {
          userId: user.id!,
          TopicId: topic.id,
          dayAssigned: proportionalDays,
          complettionStatus: "PENDING",
        },
      });

      // Create an entry in isdayAssignedByCurrentUser table
      await db.isdayAssignedByCurrentUser.create({
        data: {
          userId: user.id!,
          isDayAssigned: true,
          technologyId: technologyId,
          startDate: new Date(),
        },
      });

      return { ...topic, dayAssigned: proportionalDays };
    })
  );

  return updatedTopics;
};

export const ADDNumberOfDaysInTopic = async (
  Topicid: string,
  numberOfDays: number
) => {
  const user = await currentUser();

  if (!user || !user.id) {
    throw new Error("User not found");
  }

  const userTopicAssignment = await db.userTopicAssignment.findUnique({
    where: {
      userId_TopicId: {
        TopicId: Topicid,
        userId: user.id,
      },
    },
    select: {
      dayAssigned: true,
    },
  });

  if (!userTopicAssignment || !userTopicAssignment.dayAssigned) {
    throw new Error("User Topic Assignment not found");
  }

  // Here get the user day assigned and add the number of days to it

  const updatedUserTopicAssignment = await db.userTopicAssignment.update({
    where: {
      userId_TopicId: {
        TopicId: Topicid,
        userId: user.id,
      },
    },
    data: {
      dayAssigned: userTopicAssignment?.dayAssigned + numberOfDays,
    },
  });

 

  return updatedUserTopicAssignment;
};

export const RemoveNumberOfDaysInTopic = async (
  Topicid: string,
  numberOfDays: number
) => {
  const user = await currentUser();

  if (!user || !user.id) {
    throw new Error("User not found");
  }

  const userTopicAssignment = await db.userTopicAssignment.findUnique({
    where: {
      userId_TopicId: {
        TopicId: Topicid,
        userId: user.id,
      },
    },
    select: {
      dayAssigned: true,
    },
  });

  if (!userTopicAssignment || !userTopicAssignment.dayAssigned) {
    throw new Error("User Topic Assignment not found");
  }

  // Update dayAssigned, ensuring it doesn't go below 0
  const updatedUserTopicAssignment = await db.userTopicAssignment.update({
    where: {
      userId_TopicId: {
        TopicId: Topicid,
        userId: user.id,
      },
    },
    data: {
      dayAssigned: Math.max(0, userTopicAssignment.dayAssigned - numberOfDays),
    },
  });

 

  return updatedUserTopicAssignment;
};

export const getProgressOfsubTopic = async (technologyId: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    throw new Error("User not found");
  }

  const technology = await db.technology.findUnique({
    where: {
      id: technologyId,
    },
    select: {
      topics: {
        select: {
          subTopics: {
            select: {
              id: true,
              markAsDone: {
                where: {
                  userId: user.id,
                },
                select: {
                  userId: true,
                  subTopicId: true,
                },
              },
            },
          },
        },
      },
    },
  });

  // total number of subtopics
  const totalNumberOfSubTopics = await db.subTopic.count({
    where: {
      topic: {
        technologyId: technologyId,
      },
    },
  });

  // total number of subtopics done by the user
  const totalNumberOfSubTopicsDone = await db.markAsDone.count({
    where: {
      userId: user.id,
      subTopic: {
        topic: {
          technologyId: technologyId,
        },
      },
    },
  });


  return {
    totalNumberOfSubTopics,
    totalNumberOfSubTopicsDone,
  };

  
};


export const getPointsOfUser = async (technologyId: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    throw new Error("User not found");
  }

  const technology = await db.technology.findUnique({
    where: {
      id: technologyId,
    },
    select: {
      topics: {
        select: {
          subTopics: {
            select: {
              id: true,
              point: {
                select: {
                  point: true, // Selecting the point value
                },
              },
              markAsDone: {
                where: {
                  userId: user.id,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!technology) {
    throw new Error("Technology not found");
  }

  // Calculate the total number of subtopics in this technology
  const totalSubTopics = await db.subTopic.count({
    where: {
      topic: {
        technologyId: technologyId,
      },
    },
  })

  // Calculate the maximum points (100 points per subtopic)
  const maxPoints = totalSubTopics * 150;

  // Calculate the total points earned by the user
  const earnedPoints = (await db.markAsDone.count({
    where: {
      userId: user.id,
      subTopic: {
        topic: {
          technologyId: technologyId,
        },
      },
    },
  })) * 150;
  


  console.log(
    {
      maxPoints,
      earnedPoints,
    }
  )

 

  return { maxPoints, earnedPoints };
};




export const updateTopicCompletionStatus = async (technologyId: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    throw new Error("User not found");
  }

  const technology = await db.technology.findUnique({
    where: {
      id: technologyId,
    },
    select: {
      topics: {
        select: {
          id: true,
          subTopics: {
            select: {
              id: true,
              markAsDone: {
                where: {
                  userId: user.id,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!technology) {
    throw new Error("Technology not found");
  }

  // Loop through each topic and check if all subtopics are marked as done
  await Promise.all(
    technology.topics.map(async (topic) => {
      const allSubTopicsDone = topic.subTopics.every(
        (subTopic) => subTopic.markAsDone.length > 0
      );

      if (allSubTopicsDone) {
        // Update topic completion status to 'DONE'
        await db.userTopicAssignment.update({
          where: {
            userId_TopicId: {
              TopicId: topic.id,
              userId: user.id!,
            },
          },
          data: {
            complettionStatus: "DONE",
          },
        });
      }
    })
  );

 
};