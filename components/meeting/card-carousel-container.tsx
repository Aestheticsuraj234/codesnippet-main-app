"use client"

import * as React from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { MentorshipCard } from "./mentorship-card"

interface AvailableSlot {
  id: string
  meetingId: string
  date: Date
  time: Date
  isBooked: boolean
}

interface MentorshipData {
  title: string
  description: string
  duration: number
  discountedPrice: number | null
  availableSlots: AvailableSlot[] // Not used for now
}

interface Props {
  mentorshipData: MentorshipData[]
}

export function CarouselSpacing({ mentorshipData }: Props) {
  return (
    <Carousel className="w-full h-full relative overflow-hidden">
      <CarouselContent className="flex -ml-2 h-full">
        {mentorshipData.map((session, index) => (
          <CarouselItem key={index} className="pl-2 sm:basis-1/2 xl:basis-1/3 h-full flex-shrink-0">
            <div className="p-1 h-full">
              <MentorshipCard
                title={session.title}
                description={session.description}
                duration={session.duration}
                price={session.discountedPrice || 0} // Use discountedPrice if available
                availableSlots={session.availableSlots}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
      <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
    </Carousel>
  );
}