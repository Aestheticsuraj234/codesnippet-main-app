import { Header } from "@/components/Global/header";
import { currentUser } from "@/lib/auth/data/auth";
import { db } from "@/lib/db/db";
import { redirect } from "next/navigation";
import React from "react";
import { DsaStepCard } from "./_components/dsa-step-card";

const DsaSheetIdPage = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();

  const subscription = await db.subscription.findUnique({
    where: {
      userId: user?.id,
    },
    select: {
      status: true,
      plan: true,
      endDate: true,
    },
  });
  const { plan, endDate, status } = subscription || {};

  const isPremiumActiveUser =
    plan === "PREMIUM" && status === "ACTIVE" && user?.role === "PREMIUM_USER";

  if (!isPremiumActiveUser) {
    redirect("/dashboard/dsa");
  }

  const dsaSheetById = await db.dsa.findUnique({
    where: {
      id: params.id,
    },
    select: {
      dsaTitle: true,
      dsaSteps: {
        include: {
          dsaChapters: {
            include: {
              problems: true,
            },
          },
        },
      },
    },
  });

  if (!dsaSheetById) {
    redirect("/dashboard/dsa");
  }

  const steps = dsaSheetById.dsaSteps;

  return (
    <main className="px-4 py-4 flex flex-col">
      <Header
        title={`DSA Sheet: ${dsaSheetById.dsaTitle}`}
        description="Learn Data Structure and Algorithm"
      />

      <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-4 mt-10 mx-10">
        {steps.map((step, index) => {
          const totalProblems = step.dsaChapters.reduce((acc, chapter) => acc + chapter.problems.length, 0);
         

          return (
            <DsaStepCard
              key={index}
              stepNumber={index + 1}
              stepTitle={step.stepTitle}
              NumbersOfChapters={step.dsaChapters.length}
              problemNumbers={totalProblems}

            />
          );
        })}
      </div>
    </main>
  );
};

export default DsaSheetIdPage;
