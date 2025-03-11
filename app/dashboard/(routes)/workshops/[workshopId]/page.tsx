import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PencilRuler, PlayCircle, Github, Lock, Group, Tv } from "lucide-react";
import { db } from "@/lib/db/db";
import { currentUser } from "@/lib/auth/data/auth";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

interface WorkshopIdPageProps {
  params: Promise<{
    workshopId: string;
  }>;
}

const WorkshopIdPage = async (props: WorkshopIdPageProps) => {
  const params = await props.params;
  // TODO: Fetch workshop data based on params.workshopId
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

  const workshop = await db.workshop.findUnique({
    where: {
      id: params.workshopId,
      status: "PUBLISHED",
    },
    select: {
      id: true,
      image: true,
      isRecorded: true,
      title: true,
      description: true,
      startDate: true,
      endDate: true,
      techStack: true,
      days: {
        select: {
          userProgress: {
            where: {
              userId: user?.id,
            },
            select: {
              markedAsDone: true,
            },
          },
        },
      },
    },
  });

  const progress = workshop?.days.reduce((acc, day) => {
    return acc + day.userProgress.length;
  }, 0);



  return (
    <section className="container px-4 py-4 mx-auto my-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-0">
              <div className="relative aspect-video">
                <Image
                  src={workshop?.image!}
                  alt={workshop?.title!}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-[#27272A] bg-[#F3F4F6] dark:border-[#3F3F46] border-[#E5E7EB]">
            <CardContent className="p-6">
              <div className="flex items-center gap-x-2 mb-3">
                {workshop?.techStack.map((tech, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="bg-emerald-500/10 text-emerald-800 dark:text-emerald-300"
                  >
                    <PencilRuler className="h-4 w-4 mr-2" />
                    <span>{tech}</span>
                  </Badge>
                ))}
              </div>
              <h1 className="text-2xl font-semibold mb-2">{workshop?.title}</h1>
              <p className="text-sm text-muted-foreground mb-4">
                {workshop?.description}
              </p>
              <div className="flex gap-2 flex-wrap mb-4">
                <Badge variant="outline">
                  {workshop?.startDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  -{" "}
                  {workshop?.endDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </Badge>
              </div>
              <div>
                <Progress
                  value={(progress! / workshop?.days?.length!) * 100}
                  className="h-2 mb-2"
                />
                <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                  {progress} of {workshop?.days.length} days completed
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {isPremiumActiveUser ? (
            <Card className="bg-gradient-to-b from-sky-900 via-sky-950 to-gray-900 text-white">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Ready to start learning?
                </h2>
                <p className="text-sm text-neutral-200 mb-6">
                  Track your progress, watch with subtitles, change quality &
                  speed, and more.
                </p>
                <Button className="w-full bg-white text-sky-900 hover:bg-white/90">
                  {workshop?.isRecorded ? (
                    <Link href={`/courses/${params.workshopId}`} className="flex flex-row items-center justify-center">
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Start watching
                    </Link>
                  ) : (
                    <Link href={`https://discord.gg/z3fWhFQrKR`}  target="_blank" className="flex flex-row  items-center justify-center ">
                      <Tv className="h-4 w-4 mr-2" />
                      Join live session
                    </Link>
                  )}
                </Button>
              </CardContent>
            </Card>
          ) : null}

          <Card>
            <div className="flex flex-col items-center justify-center space-y-2">
              {isPremiumActiveUser ? (
                <Button variant={"premium"} className="w-full">
                  <FaGithub className="h-4 w-4 mr-2" />
                  Clone repository
                </Button>
              ) : (
                <Button variant={"brand"} className="w-full">
                  <Lock className="h-4 w-4 mr-2" />
                  Unlock with Premium
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WorkshopIdPage;
