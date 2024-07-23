import { ArrowBigLeft, ArrowLeft, Check, Gift } from "lucide-react";
import React from "react";

import { FeatureDataPopular } from "@/constants/FeatureData";
import PricingCard from "@/components/Global/Cards/PricingCard";
import { currentRole, currentUser } from "@/lib/auth/data/auth";
import { Badge } from "@/components/ui/badge";
import { GlareCard } from "@/components/ui/glare-card";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { db } from "@/lib/db/db";
import DigitalClock from "./_components/DigitalClock";
import Link from "next/link";
import { Boxes } from "@/components/ui/background-boxes";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/Global/loader";
import { redirect } from "next/navigation";

const Pricing = async () => {
  const role = await currentRole();
  const user = await currentUser();

  const subscription = await db.user.findUnique({
    where: {
      id: user?.id
    },
    select: {
      subscribedTo: {
        select: {
          endDate: true,
          status: true,
          plan: true
        }
      }
    }
  });

  const { subscribedTo } = subscription || {};
  const { endDate,plan,status } = subscribedTo || {};

  const isPremiumActiveUser = plan === "PREMIUM" && role === "PREMIUM_USER";


  if (isPremiumActiveUser) {
    return (
      <section className="h-screen relative w-full overflow-hidden bg-zinc-900 flex flex-col items-center justify-center rounded-lg">
        <Boxes className="z-1" />

        <GlareCard className="flex flex-col items-start justify-start px-4 py-4">
          <div className="flex flex-row justify-start items-center gap-2">
            <img
              src={user?.image}
              alt="UserImage"
              height={80}
              width={80}
              className="object-cover rounded-full border-1 border-yellow-300"
            />
            <div className="flex flex-col justify-center items-start gap-y-1">
              <h1 className="text-xl font-bold text-zinc-300 flex flex-row justify-center items-center gap-1 ">
                {user?.name}
                <RiVerifiedBadgeFill color="#FFC000" />
              </h1>
              <span className="text-sm text-zinc-500 font-medium ">
                {user?.email}
              </span>
            </div>
          </div>

          <div className="mt-7 flex flex-row justify-between items-center w-full">
            <div className="flex flex-col justify-center items-start gap-y-2">
              <h1 className="text-xl font-extrabold text-white">Subscription Details</h1>
              <div className="flex flex-row justify-start items-center gap-2">
                <Badge variant={"brand"}>
                  {plan}
                  </Badge>
                <Badge variant={status}>
                  {status}
                </Badge>
              </div>
            </div>
          </div>

          {/* div-3 */}
          <div className="mt-10 w-full flex flex-col">
            <h1 className="text-xl font-extrabold text-white">
              Subscription Ends In
            </h1>
            <DigitalClock endDate={endDate} />
          </div>

          {/* Sigma Coder Message */}

        </GlareCard>

      <Link href={"/dashboard"} className="flex  justify-center items-center w-full mt-5 relative">
      <Button variant={"brand"}  size={"default"} className="flex justify-center items-center gap-1" >
      <ArrowLeft size={24}/>
          Go to Dashboard 
      </Button>
</Link>
      </section>
    );
  }

  return (
    <section
      id="pricing"
      className="flex px-2 bg-zinc-900 flex-col justify-center items-center gap-11 rounded-md pb-10"
    >
      <h4 className="items-center pt-10 justify-center uppercase flex text-center font-semibold text-md text-yellow-500">
        Pricing that makes 🌟Sigma-Coders🌟 affordable
      </h4>

      <h1 className="font-extrabold text-[#E5ECEA] text-2xl lg:text-5xl tracking-tight md:-mb-4 flex flex-col gap-3 items-center lg:items-start">
        Unlock Your Full Potential with Sigma-Coders!
      </h1>
      <div className="text-white flex">
        <span className="text-yellow-500 flex flex-row justify-center gap-1 items-center px-2">
          <Gift /> Special Offer
        </span>{" "}
        <span className="text-[#6B7280] text-sm">- Limited Time Only</span>
      </div>

      <div className="flex justify-center items-center gap-6">
        <PricingCard
          id="premium"
          title="Premium"
          actualPrice="₹299"
          discountedPrice="₹199"
          features={FeatureDataPopular}
          isPopular={true}
        />
      </div>
    </section>
  );
};

export default Pricing;
