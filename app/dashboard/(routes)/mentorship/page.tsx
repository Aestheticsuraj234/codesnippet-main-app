import { getAllMentorshipSession, getBookingDataForCurrentUser } from "@/action/mentorship";
import { BookingsTable } from "@/components/meeting/booking-table";
import { CarouselSpacing } from "@/components/meeting/card-carousel-container";

const Mentorship = async () => {
  const mentorshipSessions = await getAllMentorshipSession(); // Fetch mentorship data
  const bookingData = await getBookingDataForCurrentUser(); // Fetch booking data

  return (
    <main className="flex flex-col flex-1 px-4 py-4">
      <h1 className="text-2xl font-bold mb-4">1:1 Mentorship</h1>
      <p className="text-muted-foreground mb-6">
        Get personalized help from our mentors
      </p>
      <div className="flex-grow overflow-hidden">
        <CarouselSpacing mentorshipData={mentorshipSessions} /> {/* Pass mentorship data */}
      </div>
    
      {/* Booking Table */}
      <div className="flex-col mt-9">
        <h2 className="text-xl font-bold mb-4">Your Bookings</h2>
        <div className="flex-1 space-y-4 p-8 pt-6">
          {bookingData.length > 0 ? (
            <BookingsTable bookings={bookingData} /> // Show the booking table if data exists
          ) : (
            <p className="text-center text-muted-foreground">
              You have no bookings yet.
            </p> // Show this message if there are no bookings
          )}
        </div>
      </div>
    </main>
  );
};

export default Mentorship;
