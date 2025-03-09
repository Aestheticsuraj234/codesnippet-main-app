"use client";
import React, { useMemo } from 'react';
import { eachMonthOfInterval, format } from 'date-fns';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Calendar, CheckCircle, Flame } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Contribution {
  date: Date;
  count: number;
  details: {
    workshopProgress: number;
    chapterProgress: number;
  };
}

interface ContributionGraphProps {
  contributions: Contribution[];
}

const ContributionGraph: React.FC<ContributionGraphProps> = ({ contributions }) => {
  const {theme} = useTheme();
  const getContributionLevel = (count: number) => {
    if (count === 0) {
      // Ensure we are in the browser before accessing window
     if(theme === 'dark') return "#1A1A1A";
     return "#e5e7eb";
    }
    if (count <= 2) return "#c6e48b";
    if (count <= 4) return "#7bc96f";
    if (count <= 6) return "#239a3b";
    return "#196127";
  };
  


  const getContributionDescription = (count: number) => {
    if (count === 0) return 'No activity';
    if (count <= 2) return 'Light activity';
    if (count <= 4) return 'Moderate activity';
    if (count <= 6) return 'High activity';
    return 'Very high activity';
  };

  // Generate month labels - show 24 months (2 years)
  const monthLabels = useMemo(() => {
    const today = new Date(); // Current date
    const currentYear = today.getFullYear(); // Current year
    const currentMonth = today.getMonth(); // Current month (0-indexed: 0 = January, 11 = December)
  
    // Calculate the start date as "12 months before the current month"
    const startDate = new Date(currentYear - 1, currentMonth, 1); // First day of the month, 1 year ago
    const endDate = new Date(currentYear, currentMonth + 1, 0); // Last day of the current month
  
    return eachMonthOfInterval({
      start: startDate,
      end: endDate,
    });
  }, []);

  // Generate week days (Sun-Sat)
  const weekDays = useMemo(() => {
    return ["S", "M", "T", "W", "T", "F", "S"]
  }, [])

  const totalStats = useMemo(() => {
    return contributions.reduce(
      (acc, curr) => {
        return {
          count: acc.count + curr.count,
          workshopProgress: acc.workshopProgress + curr.details.workshopProgress,
          chapterProgress: acc.chapterProgress + curr.details.chapterProgress
        }
      },
      { 
        count: 0,
        workshopProgress: 0,
        chapterProgress: 0

       },
    )
  }, [contributions])

  return (
    <Card className="overflow-hidden bg-[#F3F4F6] border-[#E5E7EB] dark:bg-[#27272A] dark:border-[#3F3F46]  shadow-lg transition-all duration-300 hover:shadow-xl mt-6">
         <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold flex items-center">
          <Calendar className="mr-2 h-5 w-5" />
          Your Learning Activity
        </CardTitle>

        <div className=" hidden md:flex flex-wrap gap-2">
          <Badge variant="outline" className="flex items-center gap-1 px-2 py-1 bg-white dark:bg-zinc-900">
            <CheckCircle className="h-3.5 w-3.5" />
            <span>
              {totalStats.chapterProgress} Chapters Completed
            </span>
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1 px-2 py-1 bg-white dark:bg-zinc-900">
            <BookOpen className="h-3.5 w-3.5 text-amber-500" />
            <span>
              {totalStats.workshopProgress} Workshops Completed
            </span>
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1 px-2 py-1 bg-white dark:bg-zinc-900">
            <Flame className="h-3.5 w-3.5 text-rose-500" />
            <span>{totalStats.count} Active Days</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className='p-4'>
      <div className="overflow-x-auto pb-4">
          <div className="min-w-[800px]">
            {/* Month labels */}
            <div className="flex mb-1 text-xs text-muted-foreground pl-6">
              {monthLabels.map((date, i) => (
                <div key={i} className="flex-grow text-center">
                  {format(date, "MMM")}
                </div>
              )).reverse()}
            </div>

            <div className="flex">
              {/* Weekday labels */}
              <div className="flex flex-col mr-2 text-xs text-muted-foreground">
                {weekDays.map((day, i) => (
                  <div key={i} className="h-4 flex items-center justify-center mb-[2px]">
                    {day}
                  </div>
                ))}
              </div>

              {/* Contribution grid */}
              <div className="w-full">
                <div className="grid grid-rows-7 grid-flow-col gap-[4px]">
                  {contributions
                    .slice()
                    .reverse()
                    .map((contribution, index) => (
                      <TooltipProvider key={index}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              className={cn("w-4 h-4 rounded-sm", contribution.count > 0 && "cursor-pointer")}
                              style={{ backgroundColor: getContributionLevel(contribution.count) }}
                            />
                          </TooltipTrigger>
                          <TooltipContent side="top" align="center" className="p-0 bg-transparent border-none">
                            <Card className="w-64 overflow-hidden shadow-lg">
                              <CardHeader className="py-2 px-3 bg-primary/5">
                                <CardTitle className="text-sm font-semibold">
                                  {format(contribution.date, "EEEE, MMM d, yyyy")}
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="p-3">
                                <div className="flex items-center mb-2">
                                  <div
                                    className="w-3 h-3 rounded-sm mr-2"
                                    style={{ backgroundColor: getContributionLevel(contribution.count) }}
                                  />
                                  <p className="text-sm font-medium">
                                    {getContributionDescription(contribution.count)}
                                  </p>
                                </div>

                                <ul className="text-xs space-y-2 mt-3">
                                  <li className="flex items-center justify-between">
                                    <div className="flex items-center">
                                      <CheckCircle className="mr-2 h-3.5 w-3.5" />
                                      <span>Chapter Completed</span>
                                    </div>
                                    <Badge variant="secondary" className="ml-2">
                                      {contribution.details.chapterProgress}
                                    </Badge>
                                  </li>
                                  <li className="flex items-center justify-between">
                                    <div className="flex items-center">
                                      <BookOpen className="mr-2 h-3.5 w-3.5 text-amber-500" />
                                      <span>Workshop Completed</span>
                                    </div>
                                    <Badge variant="secondary" className="ml-2">
                                      {contribution.details.workshopProgress}
                                    </Badge>
                                  </li>
                                </ul>
                              </CardContent>
                            </Card>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end mt-4 text-xs text-muted-foreground">
              <span className="mr-2">Less</span>
              {[0, 2, 4, 6, 8].map((level) => (
                <div
                  key={level}
                  className="w-3 h-3 rounded-sm mx-0.5"
                  style={{ backgroundColor: getContributionLevel(level) }}
                />
              ))}
              <span className="ml-2">More</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContributionGraph;
