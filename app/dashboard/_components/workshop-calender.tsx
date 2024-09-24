"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CalendarIcon, Clock, Trophy, Lock, Unlock } from "lucide-react"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { Button } from "@/components/ui/button"

type Workshop = {
  id: string
  title: string
  description: string
  startDate: Date
  image: string
  isRecorded: boolean
  progress: number
  isPurchased: boolean

}

type Event = {
  id: string
  title: string
  date: Date
}



interface WorkshopCalendarProps {
  workshops: Workshop[]
}

export default function WorkshopCalendar({ workshops }: WorkshopCalendarProps) {
  

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-row justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-primary text-[#1A1818] dark:text-[#ffffff]">Workshops</h2>
        <Link href="/dashboard/workshops">
          <Button variant="link" className="text-lg font-semibold">
            View All
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workshops.map((workshop) => (
          <Card key={workshop.id} className="mb-4  cursor-pointer bg-[#F3F4F6] dark:bg-[#27272A] border dark:border-[#3F3F46] border-[#E5E7EB]">
            <CardHeader className="p-4 pb-0">
              <div className="flex justify-between items-center">
                <Badge variant={workshop.isPurchased ? "secondary" : "outline"} className="mb-2">
                  {workshop.isPurchased ? (
                    <Unlock className="h-4 w-4 mr-1" />
                  ) : (
                    <Lock className="h-4 w-4 mr-1" />
                  )}
                  {workshop.isPurchased ? "Unlocked" : "Locked"}
                </Badge>
               
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex flex-col items-start space-y-4">
                <div className="aspect-video relative w-full">
                  <Image
                    src={workshop.image}
                    alt={workshop.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{workshop.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {workshop.description}
                  </p>
                  <div className="flex items-center text-gray-600 dark:text-gray-400 mt-2">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {workshop.startDate.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start justify-center p-4">
              {workshop.isPurchased ? (
                <>
                  <Progress
                    value={workshop.progress}
                    className="h-2 w-full bg-zinc-200 dark:bg-zinc-700"
                  />
                  <div className="flex items-center space-x-2 mt-3">
                    <Trophy size={16} className="text-yellow-500" />
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      {workshop.progress}% Complete
                    </span>
                  </div>
                </>
              ) : (
                <Button className="w-full" variant="brand">
                  Subscribe
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}