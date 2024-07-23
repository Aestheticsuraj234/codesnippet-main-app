import cron from 'node-cron';
import { db } from '@/lib/db/db'; // Ensure this points to your db client instance

// Define the cron job to run every day at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('Running cron job to check subscription statuses...');

  try {
    // Get the current date
    const now = new Date();

    // Update subscriptions that are past their end date to 'INACTIVE'
    await db.subscription.updateMany({
      where: {
        endDate: {
          lt: now,
        },
        status: 'ACTIVE',
      },
      data: {
        status: 'INACTIVE',
      },
    });

    console.log('Subscriptions status updated successfully.');
  } catch (error) {
    console.error('Error updating subscription statuses:', error);
  }
});
