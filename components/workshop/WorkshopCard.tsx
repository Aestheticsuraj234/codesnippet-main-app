import { Card, CardContent } from "@/components/ui/card";
import { currentRole, currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";
import { Calendar, Play, Users } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export interface WorkshopCardProps {
  date: Date;
  imageSrc: string;
  Title: string;
  Description: string;
  techStack: string[];
  isRecorded: boolean;
}

export const WorkshopCards = async ({
  date,
  imageSrc,
  Title,
  Description,
  isRecorded,
  techStack,
}: WorkshopCardProps) => {
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

  const isPremiumActiveUser =
    (subscription?.subscribedTo?.status === "ACTIVE" &&
      subscription?.subscribedTo?.plan === "PREMIUM" &&
      user?.role === "PREMIUM_USER") ||
    user?.role === "ADMIN";

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer">
      <div className="aspect-video relative">
        <img
          src={imageSrc}
          alt={Title}
          className="object-cover w-full h-full"
        />
        <div className="absolute top-2 left-2 flex items-center space-x-2">
          <Badge variant="secondary" className="flex flex-row justify-center items-center gap-1">
            {!isRecorded ? (
                <>
                <div
                    className="w-2 h-2 bg-green-500 rounded-full"
                />
                Live
                </>
            ):(
                <>
                <div
                    className="w-2 h-2 bg-red-500 rounded-full "
                />
                Recorded
                </>
            )}
          </Badge>
          <Badge variant="secondary">
            {techStack[0]}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold line-clamp-1">{Title}</h3>
          <div className="text-xs text-muted-foreground flex items-center truncate">
            <Calendar className="w-3 h-3 mr-1" />
            <span>
              {date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{Description}</p>
      </CardContent>
    </Card>
  );
};