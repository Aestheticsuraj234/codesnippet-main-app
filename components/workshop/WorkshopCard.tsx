import { Card, CardContent } from "@/components/ui/card";
import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";
import { Calendar } from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";

export interface WorkshopCardProps {
  date: Date;
  id:string
  imageSrc: string;
  Title: string;
  Description: string;
  techStack: string[];
  isRecorded: boolean;
}

export const WorkshopCards = async ({
  date,
  id,
  imageSrc,
  Title,
  Description,
  isRecorded,
  techStack,
}: WorkshopCardProps) => {
  const user = await currentUser();


  return (
    <Link href={`/dashboard/workshops/${id}`}>
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer dark:bg-[#27272A] bg-[#F3F4F6] dark:border-[#3F3F46] border-[#E5E7EB] ">
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
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{Description}</p>
      </CardContent>
    </Card>
    </Link>
  );
};