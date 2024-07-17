"use client";
import React, { useState, useEffect } from "react";
import SubFeature from "./SubFeature";

const Features = () => {
  const [launchTime, setLaunchTime] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const currentDate = new Date();
    const launchDate = new Date(currentDate.getTime() + 5 * 60000); // Adding 5 minutes (5 * 60000 milliseconds)
    const hours = launchDate.getHours().toString().padStart(2, "0");
    const minutes = launchDate.getMinutes().toString().padStart(2, "0");
    setLaunchTime(`${hours}:${minutes} AM`);
    setIsMounted(true)
  }, []);


  if (!isMounted) return null;

  return (
    <section id="feature" className="py-24" >
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#212121]/90 max-md:px-8 max-w-3xl">
          <p className="text-yellow-600 font-medium text-sm font-mono mb-3">
            const launch_time = &quot;{launchTime}&quot;;
          </p>
          <h2 className="font-bold text-3xl lg:text-5xl tracking-tight mb-8 text-[#E5ECEA]">
            Speed up your app, launch quicker, make more money
          </h2>
          <div className="text-[#E5ECEA]/60 leading-relaxed mb-8 lg:text-lg">
            Get users logged in fast, handle payments in a snap, and send emails
            quickly. Spend your time growing your startup, not figuring out
            complicated tech stuff. 🚀LaunchFast gives you ready-made code to
            launch your app in no time.
          </div>
        </div>
      </div>

      <SubFeature />
    </section>
  );
};

export default Features;
