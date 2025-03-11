import { Header } from "@/components/Global/header";
import { Hint } from "@/components/Global/hint";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FeedbackCard } from "./_components/feedback-card";
import { EmptyStateComponent } from "@/components/Global/empty-state";

const Feedback = async () => {
  const user = await currentUser();
  const feedbackData = await db.feedback.findMany({
    where: {
      userId: user?.id,
    },
    select: {
      id: true,
      category: true,
      description: true,
      priority: true,
      status: true,
      email: true,
      createdAt: true,
    },
  });

  return (
    <section className="px-4 py-4 flex flex-col h-screen">
      <div className="flex flex-row justify-between w-full items-center">
        <Header
          title="Feedback and Suggestions"
          description="We value your feedback and suggestions."
        />
        <Link href={"/dashboard/feedback/add"}>
          <Hint label="Add Feedback" align="center" side="right">
            <Button variant={"outline"} size={"icon"}>
              <Plus className="h-4 w-4" />
            </Button>
          </Hint>
        </Link>
      </div>

   
        {feedbackData.length > 0 ? (
          feedbackData.map((feedback) => (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10 container">
            <FeedbackCard
              key={feedback.id}
              category={feedback.category}
              description={feedback.description}
              priority={feedback.priority}
              // @ts-ignore
              status={feedback.status}
              email={feedback.email}
              createdAt={feedback.createdAt}
            />
            </div>
          ))
        ) : (
          <div className="flex flex-col justify-center items-center w-full ">
   <EmptyStateComponent
            description="You have not added any feedback yet."
            imageUrl="/empty-feedback.svg"
            title="No Feedback Added"
          />
          </div>
       
        )}
      
    </section>
  );
};

export default Feedback;
