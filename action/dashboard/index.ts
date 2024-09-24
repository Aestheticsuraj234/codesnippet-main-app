"use server";
import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";

export const getProgressForAllTechnologies = async () => {
  const user = await currentUser();

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
            subTopics: true,
            },
        },
        },
    });

    


    const userCompletedSubTopics = await db.markAsDone.findMany({
        where: {
        userId: user?.id,
        },
        select: {
        subTopicId: true,
        },
    });

    // create a set

    const completedSubtopicId =     new Set(userCompletedSubTopics.map((subTopic) => subTopic.subTopicId));

    // calculate the progress for each technology
    const progress = technologies.map((technology) => {
        const totalSubTopics = technology.topics.reduce((acc, topic) => {
        return acc + topic.subTopics.length;
        }, 0);

        const completedSubTopics = technology.topics.reduce((acc, topic) => {
        return (
            acc +
            topic.subTopics.filter((subTopic) =>
            completedSubtopicId.has(subTopic.id)
            ).length
        );
        }, 0);

        return {
        technologyId: technology.id,
        progress: Math.round((completedSubTopics / totalSubTopics) * 100),
        };
    });


    return progress;


};


export const getProgressForAllWorkshops = async () => { 
    const user = await currentUser();

    const workshops = await db.workshop.findMany({
        where:{
            status:"PUBLISHED"
        },
        select:{
            id:true,
            days:{

                select:{
                    id:true,
                    userProgress:{
                        where:{
                            userId:user?.id
                        },
                        select:{
                            markedAsDone:true
                        }
                    }
                }
            }
        }
    })
    
    const progress = workshops.map((workshop) => {
        const totalDays = workshop.days.length;
        const completedDays = workshop.days.filter((day) => {
        return day.userProgress.some((progress) => progress.markedAsDone);
        }).length;

        return {
        workshopId: workshop.id,
        progress: Math.round((completedDays / totalDays) * 100),
        };
    });


    return progress;
          
}





export const getProgressForAllCourses = async () => {      
const user = await currentUser();

const courses = await db.courses.findMany({
    where:{
        status:"PUBLISHED"
    },
    select:{
        id:true,
        chapters:{
            select:{
                id:true,
                chapterProgression:{
                    where:{
                        userId:user?.id
                    },
                    select:{
                        markedAsDone:true
                    }
                    }
                }
            }
        }
    }
)



const progress = courses.map((course) => {
    const totalChapters = course.chapters.length;
    const completedChapters = course.chapters.filter((chapter) => {
    return chapter.chapterProgression.some((progress) => progress.markedAsDone);
    }).length;

    return {
    courseId: course.id,
    progress: Math.round((completedChapters / totalChapters) * 100),
    };
});

return progress;


}