"use client";
import { Header } from "@/components/Global/header";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Users, Award, Gift, Briefcase } from "lucide-react";
import { useModal } from "@/zustand/use-modal";

const MainSection = () => {
  const { onOpen } = useModal();
  return (
    <>
      <section className="mb-12 mt-10">
        <h2 className="text-2xl font-semibold mb-6 text-[#1A1818] dark:text-[#ffffff]">
          How to Become a{" "}
          <span className="text-[#08BD80]">Campus Ambassador</span>
        </h2>
        <div className="space-y-4">
          {[
            {
              title: "Onboarding",
              description: "Complete our comprehensive onboarding process",
            },
            {
              title: "Activate",
              description:
                "Receive your unique referral link and start your journey",
            },
            {
              title: "Interview",
              description:
                "If selected, participate in a brief online interview",
            },
          ].map((step, index) => (
            <Card
              key={index}
              className="border-l-4 border-l-blue-500 bg-[#F3F4F6]  dark:bg-[#27272A] "
            >
              <CardContent className="flex items-center p-4">
                <div className="mr-4 bg-blue-100 rounded-full p-2">
                  <ChevronRight className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1A1818] dark:text-[#ffffff]">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#374151] dark:text-[#71717A]">
                    {step.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-[#1A1818] dark:text-[#ffffff]">
          Benefits of Being a Campus Ambassador
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Networking Opportunities",
              description:
                "Connect with industry professionals and like-minded peers",
              icon: Users,
            },
            {
              title: "Skill Development",
              description:
                "Enhance your leadership, communication, and marketing skills",
              icon: Award,
            },
            {
              title: "Exclusive Rewards",
              description:
                "Earn points redeemable for products, services, or cash",
              icon: Gift,
            },
            {
              title: "Career Advancement",
              description:
                "Gain valuable experience and potential internship opportunities",
              icon: Briefcase,
            },
          ].map((benefit, index) => (
            <Card
              key={index}
              className="border-t-4 border-t-green-500 bg-[#F3F4F6]  dark:bg-[#27272A] "
            >
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-semibold text-[#1A1818] dark:text-[#ffffff]">
                  {<benefit.icon className="h-5 w-5 mr-2 text-green-500" />}
                  {benefit.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-[#374151] dark:text-[#71717A]">
                {benefit.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="text-center mb-12">
        <Button
          onClick={() => onOpen("ONBOARD_AMBASSADOR")}
          size="lg"
          variant={"brand"}
          className="font-semibold py-3 px-8 rounded-md transition duration-300"
        >
          Apply Now
        </Button>
      </div>
    </>
  );
};

export default MainSection;
