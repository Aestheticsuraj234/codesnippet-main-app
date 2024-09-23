"use client";
import React from 'react';
import { format } from 'date-fns';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Calendar, CheckCircle } from 'lucide-react';
import { useTheme } from 'next-themes';

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

  return (
    <Card className="overflow-hidden bg-[#F3F4F6] border-[#E5E7EB] dark:bg-[#27272A] dark:border-[#3F3F46]  shadow-lg transition-all duration-300 hover:shadow-xl mt-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <Calendar className="mr-2 h-6 w-6 text-primary" />
          Your Learning Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-rows-7 grid-flow-col gap-1">
          {contributions.slice().reverse().map((contribution, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className={`w-3 h-3 rounded-sm`}
                    style={{ backgroundColor: getContributionLevel(contribution.count) }}
                  />
                </TooltipTrigger>
                <TooltipContent className="bg-transparent border-none">
                  <Card className="w-64 overflow-hidden bg-[#F3F4F6] border-[#E5E7EB] dark:bg-[#27272A] dark:border-[#3F3F46]  shadow-lg transition-all duration-300 hover:shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-sm font-semibold">
                        {format(contribution.date, 'MMM d yyyy')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-2">{getContributionDescription(contribution.count)}</p>
                      <ul className="text-xs space-y-1">
                        <li className="flex items-center">
                          <BookOpen className="mr-2 h-3 w-3" color='#FFC000' />
                          {contribution.details.workshopProgress} workshop days completed
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="mr-2 h-3 w-3" color='#8188EC' />
                          {contribution.details.chapterProgress} chapters completed
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContributionGraph;
