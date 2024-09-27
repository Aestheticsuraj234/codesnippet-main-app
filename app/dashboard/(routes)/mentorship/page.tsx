import { CarouselSpacing } from "@/components/meeting/card-carousel-container";
import { db } from "@/lib/db/db";

const Mentorship = async () => {
  const mentorshipSessions = await db.meeting.findMany({
    select: {
      title: true,
      description: true,
      duration: true,
      discountedPrice: true,
      availableSlots: true, // Available slots fetched but not used for now
    },
  });

  return (
    <main className="flex flex-col flex-1 px-4 py-4 h-screen">
      <h1 className="text-2xl font-bold mb-4">1:1 Mentorship</h1>
      <p className="text-muted-foreground mb-6">Get personalized help from our mentors</p>
      <div className="flex-grow overflow-hidden">
        <CarouselSpacing mentorshipData={mentorshipSessions} /> {/* Pass mentorship data */}
      </div>
    </main>
  );
};

export default Mentorship;