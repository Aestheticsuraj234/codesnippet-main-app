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








export const generateReferalCode = (length = 6) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  let result = '';

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}