
import React from 'react';
import { Flame, Trophy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate } from '@/lib/utils/dateUtils';


interface StreakBadgeProps {
  streak: {
    current: number;
    longest: number;
    streakStartDate: Date | null;
    streakEndDate: Date | null;
  };
}

const StreakBadge: React.FC<StreakBadgeProps> = ({ streak }) => {
  return (
    <div className="flex gap-4 mb-5 mt-2 animate-fade-up">
      <Card className="glass-card flex-1 overflow-hidden">
        <CardContent className="p-4 flex items-center">
          <div className="mr-3 p-2 bg-orange-100 dark:bg-orange-900/30 rounded-full">
            <Flame className="h-5 w-5 text-orange-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Current Streak</p>
            <p className="text-2xl font-semibold">
              {streak.current}
              <span className="text-sm font-normal text-muted-foreground ml-1">days</span>
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card flex-1 overflow-hidden">
        <CardContent className="p-4 flex items-center">
          <div className="mr-3 p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
            <Trophy className="h-5 w-5 text-indigo-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Longest Streak</p>
            <p className="text-2xl font-semibold">
              {streak.longest}
              <span className="text-sm font-normal text-muted-foreground ml-1">days</span>
            </p>
            {streak.streakStartDate && streak.streakEndDate && streak.longest > 0 && (
              <p className="text-xs text-muted-foreground">
                {formatDate(streak.streakStartDate)} - {formatDate(streak.streakEndDate)}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StreakBadge;
