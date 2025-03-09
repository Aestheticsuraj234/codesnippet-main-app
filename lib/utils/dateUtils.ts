import { addDays, subDays, format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

// Generate the last 120 days of data for the contribution graph
export const generatePastDays = (days: number = 120) => {
  const today = new Date();
  const pastDays = [];
  
  for (let i = 0; i < days; i++) {
    pastDays.push(subDays(today, i));
  }
  
  return pastDays;
};

// Get days of a specific month
export const getDaysInMonth = (date: Date) => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  
  return eachDayOfInterval({ start, end });
};

// Return the weekday as a single letter
export const formatWeekday = (date: Date): string => {
  return format(date, 'EEEEE'); // Returns M for Monday, T for Tuesday, etc.
};

// Format a date as a standard localized date string
export const formatDate = (date: Date): string => {
  return format(date, 'MMMM d, yyyy');
};

// Find a contribution for a specific date in the contribution array
export const findContributionForDate = (date: Date, contributions: Array<{date: Date; count: number; details: any}>) => {
  return contributions.find((contribution) => 
    isSameDay(new Date(contribution.date), date)
  ) || {
    date,
    count: 0,
    details: { workshopProgress: 0, chapterProgress: 0 }
  };
};

// Calculate longest streak from contributions
export const calculateStreak = (contributions: Array<{date: Date; count: number; details: any}>) => {
  // Sort contributions by date
  const sortedContributions = [...contributions].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  let currentStreak = 0;
  let longestStreak = 0;
  let streakStartDate = null;
  let streakEndDate = null;
  
  // Process each day
  const today = new Date();
  const days = generatePastDays(120);
  
  // Check for active days (count > 0)
  let activeStreak = 0;
  
  for (let i = 0; i < days.length; i++) {
    const day = days[i];
    const contribution = findContributionForDate(day, sortedContributions);
    
    if (contribution && contribution.count > 0) {
      activeStreak++;
      
      // Track longest streak
      if (activeStreak > longestStreak) {
        longestStreak = activeStreak;
        streakEndDate = day;
        streakStartDate = subDays(day, activeStreak - 1);
      }
    } else {
      activeStreak = 0;
    }
  }
  
  // Calculate current streak (consecutive days from today)
  for (let i = 0; i < days.length; i++) {
    const day = days[i];
    const contribution = findContributionForDate(day, sortedContributions);
    
    if (contribution && contribution.count > 0) {
      currentStreak++;
    } else {
      break; // Stop at first day with no activity
    }
  }
  
  return {
    current: currentStreak,
    longest: longestStreak,
    streakStartDate,
    streakEndDate
  };
};
