"use server";
import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";

export const getSubscription = async () => {
    const user = await currentUser();
    
      const subscription = await db.user.findUnique({
        where: {
          id: user?.id,
        },
        select: {
          subscribedTo: {
            select: {
              endDate: true,
              status: true,
              plan: true,
            },
          },
        },
      });


    return subscription;
  };
