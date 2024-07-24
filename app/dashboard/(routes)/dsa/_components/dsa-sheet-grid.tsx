"use client";

import {
  BookIcon,
  BookOpenIcon,
  CalendarIcon,
  CodeIcon,
  ListIcon,
  EditIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { formatDate, formatDistanceToNowInWords } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ContentStatus } from "@prisma/client";

interface DsaSheetGridProps {
  id: string;
  title: string;
  stepsCount: number;
  chaptersCount: number;
  problemsCount: number;
  updatedAt: Date; // Assuming createdAt is a string in ISO format
  isPremiumActiveUser: boolean;
}

export const DsaSheetGrid = ({
  id,
  title,
  isPremiumActiveUser,
  stepsCount,
  chaptersCount,
  problemsCount,
  updatedAt,
}: DsaSheetGridProps) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/dashboard/dsa/${id}`);
  };

  const handlePremiumClick = () => {
    router.push(`/pricing`)
  }

  return (
    <Card>
      <CardHeader className="flex flex-col items-start justify-center cursor-pointer">
        <BookIcon size={40} className="px-2 py-2 border rounded-full " />
        <CardTitle className=" font-extrabold text-xl truncate text-zinc-700 dark:text-zinc-100 flex justify-between items-center w-full">
          {title.toUpperCase()}
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="mx-2 my-2 flex  flex-col space-y-5">
        <div className="flex flex-row justify-between items-center mx-2 my-2">
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              <ListIcon
                size={40}
                className="border rounded-full text-white bg-indigo-300 px-2 py-2"
              />
              <div>
                <div className="font-medium">Steps</div>
                <div className="text-muted-foreground">{stepsCount}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              <BookOpenIcon
                size={40}
                className="border rounded-full text-white bg-green-400 px-2 py-2"
              />
              <div>
                <div className="font-medium">Chapters</div>
                <div className="text-muted-foreground">{chaptersCount}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center mx-2 my-2">
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              <CodeIcon
                size={40}
                className="border rounded-full text-white bg-pink-300 px-2 py-2"
              />
              <div>
                <div className="font-medium">Problems</div>
                <div className="text-muted-foreground">{problemsCount}</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end">
        {isPremiumActiveUser ? (
          <Button
            variant="outline"
            onClick={handleCardClick}
            className="px-4 py-2"
          >
            View 🚀
          </Button>
        ) : (
          <Badge onClick={handlePremiumClick}  variant="destructive" className="px-4 py-2">
            Upgrade to premium
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
};
