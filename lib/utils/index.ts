import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, formatDistanceToNow } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// utils/formatDate.js


/**
 * Formats a date into a readable string.
 * @param {Date | number} date - The date to format.
 * @returns {string} - The formatted date string.
 */
export const formatDate = (date:Date) => {
  return format(date, 'PPP'); // Example: Jan 1, 2024
};

/**
 * Formats a date into a readable time string.
 * @param {Date | number} date - The date to format.
 * @returns {string} - The formatted time string.
 */
export const formatTime = (date:Date) => {
  return format(date, 'p'); // Example: 12:34 PM
};

/**
 * Formats a date into a readable string including time.
 * @param {Date | number} date - The date to format.
 * @returns {string} - The formatted date-time string.
 */
export const formatDateTime = (date:Date) => {
  return format(date, 'PPpp'); // Example: Jan 1, 2024 at 12:34 PM
};

/**
 * Returns the distance between the given date and now in words.
 * @param {Date | number} date - The date to compare.
 * @returns {string} - The distance in words.
 */
export const formatDistanceToNowInWords = (date:Date) => {
  // const now = new Date();

  return formatDistanceToNow(date, { addSuffix: false }); // Example: 2 hours ago
};



async function getVideoDuration(videoId:string) {
  const apiKey = process.env.GOOGLE_API_KEY; // Replace with your YouTube Data API key
  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const duration = data.items[0].contentDetails.duration;
      return formatDuration(duration); // Format the ISO 8601 duration into a readable format
    } else {
      throw new Error('Video not found or API error');
    }
  } catch (error) {
    console.error('Error fetching video duration:', error);
    return null;
  }
}

// Helper function to format ISO 8601 duration into readable format (e.g., "34 Mins 12 Secs")
function formatDuration(duration:any) {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = match[1] ? match[1].replace('H', '') : '0';
  const minutes = match[2] ? match[2].replace('M', '') : '0';
  const seconds = match[3] ? match[3].replace('S', '') : '0';
  return `${hours !== '0' ? hours + ' Hours ' : ''}${minutes !== '0' ? minutes + ' Mins ' : ''}${seconds !== '0' ? seconds + ' Secs' : ''}`.trim();
}

export { getVideoDuration };