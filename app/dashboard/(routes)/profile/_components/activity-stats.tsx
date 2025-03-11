import React from 'react';
import { Award, BookOpen, CheckCircle, Clock, LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ActivityStat {
  icon: LucideIcon;
  color: string;
  bgColor: string;
  label: string;
  value: number;
  unit: string;
}

interface ActivityStatsProps {
  totalWorkshops: number;
  totalChapters: number;
  totalHours: number;
  achievements: number;
}

const ActivityStats: React.FC<ActivityStatsProps> = ({ 
  totalWorkshops, 
  totalChapters, 
  totalHours,
  achievements
}) => {
  const stats: ActivityStat[] = [
    {
      icon: BookOpen,
      color: 'text-amber-500',
      bgColor: 'bg-amber-100 dark:bg-amber-900/20',
      label: 'Workshops',
      value: totalWorkshops,
      unit: 'completed'
    },
    {
      icon: CheckCircle,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      label: 'Chapters',
      value: totalChapters,
      unit: 'completed'
    },
    {
      icon: Clock,
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      label: 'Learning Time',
      value: totalHours,
      unit: 'hours'
    },
    {
      icon: Award,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
      label: 'Achievements',
      value: achievements,
      unit: 'earned'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 animate-fade-in">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="glass-card overflow-hidden border shadow-sm transition-all duration-300 hover:shadow-md">
            <CardContent className="p-4 flex flex-col items-center">
              <div className={`p-2 mb-2 ${stat.bgColor} rounded-full`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <p className="text-sm text-center text-muted-foreground">{stat.label}</p>
              <p className="text-xl font-semibold flex items-baseline">
                {stat.value}
                <span className="text-xs font-normal text-muted-foreground ml-1">{stat.unit}</span>
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ActivityStats;
