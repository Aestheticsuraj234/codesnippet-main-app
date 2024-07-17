import { Crown, Rocket } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

const CallToAction = () => {
  return (
    <section className="bg-zinc-900 ">
      <div className="pb-32 pt-16 px-8 max-w-3xl mx-auto flex flex-col items-center gap-8 md:gap-12">
        <div className="text-center">
          <Crown size={60}  className="text-yellow-500 -translate-x-4 -rotate-45" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#E5ECEA] mt-4 leading-5">
            Boost your app, launch, earn money , repeat , with LaunchFast
          </h2>
          <p className="text-lg text-[#E5ECEA]/50  font-medium mt-5 ">
            Dont waste time on Stripe subscriptions , user authentication, email
            notifications, payments, invoices, webhooks, and more.
          </p>
         
        </div>
        <Button size={"lg"} variant={"brand"} className="text-sm font-semibold flex items-center justify-center gap-2">
          <Rocket size={20} /> Get LaunchFast
        </Button>
      </div>
    </section>
  );
};

export default CallToAction;
