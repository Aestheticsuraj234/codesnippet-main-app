import React from "react";
import TopicDayWiseCaLender from "./TopicWiseCalender";
import { db } from "@/lib/db/db";
import { currentUser } from "@/lib/auth/data/auth";

interface props {
  technologyId: string;
}
const TopicWiseCalenderClient = async ({ technologyId }: props) => {
    
  const user = await currentUser();
  const technology = await db.technology.findUnique({
    where: {
      id: technologyId,
      status: "PUBLISHED",
    },
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
        },
      },
    },
  });

  console.log(JSON.stringify(technology, null, 2));

  return (
    <>
      <TopicDayWiseCaLender technology={technology} />
    </>
  );
};

export default TopicWiseCalenderClient;
