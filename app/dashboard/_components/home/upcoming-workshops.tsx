import { Card, CardContent } from "@/components/ui/card";
import { currentRole, currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";
import { UserRole } from "@prisma/client";
import { Lock, Unlock } from "lucide-react";

export interface UpcomingWorkshopProps {
  Date: string;
  imageSrc: string;
  Category: string;
  Title: string;
  Description: string;
}

export const UpcomingWorkshops = async({Date , imageSrc,Category , Title , Description}:UpcomingWorkshopProps) => {
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
    <Card className="cursor-pointer">
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-muted-foreground">{Date}</div>
        <div className="flex justify-center items-center  rounded-full bg-yellow-500 px-2 py-1 text-xs font-medium text-primary-foreground">
          {
           isPremiumActiveUser ? <Unlock className="w-4 h-4 inline-block mr-1"/> : <Lock className="w-4 h-4 inline-block mr-1" />
          }
          {Category}
        </div>
      </div>
      <main className="flex flex-col items-start justify-center  mt-3">
      <div className="aspect-video relative overflow-hidden  border rounded-md shadow-md hover:shadow-xl">
        <img src={imageSrc} className="object-cover w-full h-full rounded-md" />
      </div>
      <div className="flex flex-col items-start justify-start mt-2"> 
      <h3 className="text-lg font-bold">{Title}</h3>
      <p className="text-sm text-muted-foreground ">
        {Description}
      </p>
      </div>
   
      </main>
     
    </CardContent>
  </Card>
  );
};
