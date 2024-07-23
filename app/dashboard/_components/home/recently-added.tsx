import { Card, CardContent } from "@/components/ui/card";
import { currentRole, currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";
import { UserRole } from "@prisma/client";
import { Lock, Unlock } from "lucide-react";

export interface RecentlyAddedProps {
  Date: string;
  Category: string;
  Title: string;
  Description: string;
}

export const RecentlyAdded = async({
  Date,
  Category,
  Title,
  Description,
}: RecentlyAddedProps) => {
  const role = await currentRole();
  const user = await currentUser();
  const subscription = await db.user.findUnique({
    where: {
      id: user?.id
    },
    select: {
      subscribedTo: {
        select: {
          endDate: true,
          status: true,
          plan: true
        }
      }
    }
  });

  const isPremiumActiveUser = subscription?.subscribedTo?.status === "ACTIVE" && subscription?.subscribedTo?.plan === "PREMIUM" && user?.role === "PREMIUM_USER";
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
        <div className="flex justify-center items-center  rounded-full bg-yellow-500 px-2 py-1 text-xs font-medium text-primary-foreground">
          {
            isPremiumActiveUser ? <Unlock className="w-4 h-4 inline-block mr-1"/> : <Lock className="w-4 h-4 inline-block mr-1" />
          }
          {Category}
        </div>
          <div className="text-sm font-medium text-muted-foreground">
            {Date}
          </div>
        </div>
        <h3 className="text-lg font-bold mt-2">{Title}</h3>
        <p className="text-sm text-muted-foreground mt-2">{Description}</p>
      </CardContent>
    </Card>
  );
};
