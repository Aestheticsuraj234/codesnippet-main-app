"use client";

import { useState } from "react";
import {
  Calendar,
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { addDays, format, isToday } from "date-fns";
import { Badge } from "@/components/ui/badge";

type EventStatus = "PENDING" | "DONE" | "MISSED";

type Event = {
  id: string;
  title: string;
  date: Date;
  status: EventStatus;
  dayNumber?: number;
};

interface TopicDayWiseCalendarProps {
  technology: any;
}

const statusColors: Record<EventStatus, string> = {
  PENDING: "bg-yellow-500",
  DONE: "bg-green-500",
  MISSED: "bg-red-500",
};

export default function TopicDayWiseCalendar({
  technology,
}: TopicDayWiseCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const generateEvents = () => {
    const events: Event[] = [];
    let currentStartDate = new Date(technology.isDayAssigned[0].startDate);
    let globalDayCounter = 1;

    technology.topics.forEach((topic) => {
      const dayAssigned = topic.dayAssigned[0].dayAssigned;
      const status = topic.dayAssigned[0].complettionStatus;

      for (let i = 0; i < dayAssigned; i++) {
        const eventDate = addDays(currentStartDate, i);
        events.push({
          id: topic.id,
          title: topic.title,
          date: eventDate,
          status: status,
          dayNumber: globalDayCounter,
        });
        globalDayCounter++;
      }

      currentStartDate = addDays(currentStartDate, dayAssigned);
    });

    console.log(events);
    return events;
  };

  const getDayEvents = (day: number): Event[] => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );

    const allEvents = generateEvents();

    return allEvents.filter((event) => {
      return (
        event.date.getFullYear() === date.getFullYear() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getDate() === date.getDate()
      );
    });
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="bg-card text-card-foreground rounded-lg shadow-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPreviousMonth}
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-2xl font-semibold">
            {format(currentDate, "MMMM yyyy")}
          </h2>
          <Button
            variant="outline"
            size="icon"
            onClick={goToNextMonth}
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-7 gap-1 p-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center font-semibold p-2">
              {day}
            </div>
          ))}
          {Array.from({ length: 42 }).map((_, index) => {
            const day = index - firstDayOfMonth + 1;
            const isCurrentMonth = day > 0 && day <= daysInMonth;
            const dayEvents = isCurrentMonth ? getDayEvents(day) : [];

            const isTodayDate = isToday(
              new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
            );

            return (
              <div
                key={index}
                className={cn(
                  "border rounded-lg p-2 aspect-square",
                  "flex flex-col",
                  isCurrentMonth ? "bg-background" : "bg-muted",
                  isTodayDate ? "border-indigo-400 border-2" : ""
                )}
              >
                {isCurrentMonth && (
                  <>
                    <div className="w-full flex justify-between items-center gap-2 ">
                      <div
                        className={cn(
                          "font-semibold mb-1 flex items-center justify-center text-sm",
                          {
                            "font-bold border rounded-full bg-indigo-400 text-white h-8 w-8 ":
                              isTodayDate, // Apply bold font, rounded, and fixed size if today
                          }
                        )}
                      >
                        {day}
                      </div>

                      {isTodayDate && (
                        <div className="flex flex-row mb-2 justify-center items-center gap-1 bg-indigo-400 px-1 py-1 rounded-md">
                          <CalendarIcon className="h-3 w-3 text-white" />
                          <p className="text-sm truncate font-normal text-white">
                            Ongoing
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex-grow overflow-y-auto flex flex-col items-start justify-start gap-y-2">
                      {dayEvents.map((event) => (
                        <>
                          <div
                            key={event.id}
                            onClick={() => handleEventClick(event)}
                            className={cn(
                              "text-xs p-1 mb-1 rounded cursor-pointer transition-all duration-200 ease-in-out",
                              statusColors[event.status],
                              "hover:bg-opacity-75 text-white w-full flex flex-col gap-y-1" , isTodayDate ? "bg-indigo-400" : ""
                            )}
                          >
                            <span className="text-sm truncate font-normal ">
                              {event.title}
                            </span>
                          </div>
                          <Badge
                            variant={event.status}
                            className={cn(
                              "cursor-pointer " , isTodayDate ? "bg-indigo-400" : ""
                            )}
                          >{`Day-${event.dayNumber}`}</Badge>
                        </>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-2">
              {selectedEvent.title}
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-100 font-bold ">
              Date: {format(selectedEvent.date, "PPP")}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-100 font-bold">
              Status: {selectedEvent.status?.toUpperCase()}
            </p>
            <Button className="mt-4" onClick={() => setSelectedEvent(null)}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
