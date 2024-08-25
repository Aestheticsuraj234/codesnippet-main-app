import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TopicWiseAccordion from './TopicWiseAccordian';
import TopicWiseSubTopicCard from './TopicWiseSubTopicCard';
import { currentUser } from '@/lib/auth/data/auth';
import TopicDayWiseCaLender from './calender/TopicWiseCalender';
import TopicWiseCalenderClient from './calender/TopicWiseCalenderClient';

interface MainContentTabInterface {
  technologyId: string;
  technology: any;
}

const MainContentTab = async({ technologyId, technology }: MainContentTabInterface) => {
  let currentStartDate = technology.isDayAssigned[0].startDate;

  console.log(JSON.stringify(technology, null, 2));
  const user = await currentUser();

  return (
    <section className="w-auto mt-14">
      <Tabs defaultValue="topicWise">
        <TabsList>
          <TabsTrigger value="topicWise">Topic Wise</TabsTrigger>
          <TabsTrigger value="dayWise">Day Wise</TabsTrigger>
        </TabsList>

        <TabsContent value="topicWise">
          <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
              {technology.topics.map((topic) => {
                const dayAssigned = topic.dayAssigned[0].dayAssigned;
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
                    {topic.subTopics.map((subTopic) => (
                     <div key={subTopic.id} className="grid gap-5 md:grid-cols-1 lg:grid-cols-1 mx-x my-2 w-full">
                        <TopicWiseSubTopicCard
                        id={subTopic.id}
                        title={subTopic.title}
                        isCompleted={subTopic.markAsDone.some((mark)=>mark.userId === user?.id)}
                        />
                      </div>
                    ))}
                  </TopicWiseAccordion>
                );
              })}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="dayWise">
          <div className="flex-col">
            <div className="flex-1 space-y-4 pt-8">
              <TopicWiseCalenderClient technologyId={technologyId} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}

export default MainContentTab;
