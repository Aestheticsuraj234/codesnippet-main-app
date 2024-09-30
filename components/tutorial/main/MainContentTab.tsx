import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TopicWiseAccordion from './TopicWiseAccordian';
import TopicWiseSubTopicCard from './TopicWiseSubTopicCard';
import { currentUser } from '@/lib/auth/data/auth';
import TopicWiseCalenderClient from './calender/TopicWiseCalenderClient';
import ProgressBarContainer from './progressBar/ProgressBarContainer';

interface MainContentTabInterface {
  technologyId: string;
  technology: any;
}

const MainContentTab = async({ technologyId, technology }: MainContentTabInterface) => {
  const user = await currentUser();
  let currentStartDate = technology?.isDayAssigned?.[0]?.startDate
    ? new Date(technology.isDayAssigned[0].startDate)
    : new Date(); // Fallback to today's date if startDate is undefined

  return (
    <>
      <ProgressBarContainer
        technologyId={technologyId}
        technology={technology}
      /> 
  
      <section className="w-auto mt-14">
        <Tabs defaultValue="topicWise">
          <TabsList>
            <TabsTrigger value="topicWise">Topic Wise</TabsTrigger>
            <TabsTrigger value="dayWise">Day Wise</TabsTrigger>
          </TabsList>

          {/* Topic Wise Content */}
          <TabsContent value="topicWise">
            <div className="flex-col">
              <div className="flex-1 space-y-4 p-8 pt-6">
                {technology.topics.map((topic: any) => {
                  const dayAssigned = topic?.dayAssigned?.[0]?.dayAssigned ?? 0; // Fallback to 0 if dayAssigned is undefined
                  
                  if (dayAssigned) {
                    const endDate = new Date(currentStartDate);
                    endDate.setDate(currentStartDate.getDate() + dayAssigned - 1);

                    const startDate = new Date(currentStartDate); // Capture current start date
                    currentStartDate.setDate(currentStartDate.getDate() + dayAssigned); // Move start date forward for next topic

                    return (
                      <TopicWiseAccordion
                        key={topic.id}
                        title={topic.title}
                        topicId={topic.id}
                        dayAssigned={dayAssigned}
                        startDate={startDate}
                        endDate={endDate}
                      >
                        {topic.subTopics.map((subTopic: any) => (
                          <div key={subTopic.id} className="grid gap-5 md:grid-cols-1 lg:grid-cols-1 mx-x my-2 w-full">
                            <TopicWiseSubTopicCard
                              id={subTopic.id}
                              technologyId={technologyId}
                              title={subTopic.title}
                              isCompleted={subTopic.markAsDone.some((mark: any) => mark.userId === user?.id)}
                            />
                          </div>
                        ))}
                      </TopicWiseAccordion>
                    );
                  } else {
                    // If no dayAssigned, you can render a placeholder or a warning
                    console.warn('dayAssigned is missing for topic:', topic.title);
                    return null;
                  }
                })}
              </div>
            </div>
          </TabsContent>

          {/* Day Wise Content */}
          <TabsContent value="dayWise">
            <div className="flex-col">
              <div className="flex-1 space-y-4 pt-8">
                <TopicWiseCalenderClient technologyId={technologyId} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}

export default MainContentTab;
