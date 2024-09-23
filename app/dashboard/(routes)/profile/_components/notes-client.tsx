import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Calendar, ExternalLink } from "lucide-react";
import Link from "next/link";

interface Props {
  notes: {
    note: string;
    createdAt: Date;
    subTopic: {
      id: string;
      topic: {
        technologyId: string;
        id: string;
      };
      title: string;
    };
  }[];
}

const NotesClient = ({ notes }: Props) => {
  if (!notes || notes.length === 0) {
    return (
      <Card className="overflow-hidden bg-[#F3F4F6] border-[#E5E7EB] dark:bg-[#27272A] dark:border-[#3F3F46] shadow-lg transition-all duration-300 hover:shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <BookOpen className="mr-2 h-6 w-6 text-primary" />
            Your Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-lg text-center text-muted-foreground">
              You haven not taken any notes yet.
            </p>
            <Link href="/dashboard/tutorials" passHref>
              <Button variant="brand" size="sm" className="mt-4">
                <BookOpen className="mr-2 h-4 w-4" />
                Explore Tutorial
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden bg-[#F3F4F6] border-[#E5E7EB] dark:bg-[#27272A] dark:border-[#3F3F46] shadow-lg transition-all duration-300 hover:shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <BookOpen className="mr-2 h-6 w-6 text-primary" />
          Your Notes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="pr-4">
          {notes.map((note, index) => (
            <React.Fragment key={index}>
              <div className="py-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">
                    {note.subTopic.title}
                  </h3>
                  <Link
                    href={`/tutorial/${note.subTopic.topic.technologyId}/learn/${note.subTopic.id}`}
                    passHref
                  >
                    <Button variant="outline" size="sm" className="ml-2">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="mr-1 h-3 w-3" />
                  {note.createdAt.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
              {index < notes.length - 1 && (
                <Separator className="dark:bg-[#3F3F46]" />
              )}
            </React.Fragment>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default NotesClient;
