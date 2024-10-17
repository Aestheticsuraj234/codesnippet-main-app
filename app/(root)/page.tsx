"use client";
import SubFeature from "@/components/Home/SubFeature";
import Instructor from "@/components/Home/Instructor";
import FAQ from "@/components/Home/FAQ";
import HomeComponent from "@/components/Home/HomeComponent";
import HowItWorks from "@/components/Home/HowItWorks";
import Explore from "@/components/Home/Explore";
import { useEffect, useState } from "react";

const Home = () => {
  const [refCode, setRefCode] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check the URL for ref code ONLY on the first render
      const code = new URLSearchParams(window.location.search).get("ref");

      if (code) {
        setRefCode(code); // Store in state
        localStorage.setItem("ref", code); // Store in localStorage
      } else {
        // If there's no code in the URL, check localStorage
        const savedRef = localStorage.getItem("ref");
        if (savedRef) setRefCode(savedRef); // Restore state from localStorage
      }
    }
  }, []); // Run only once when the component mounts

  return (
    <main className="mx-10 mt-20 mb-10 flex h-full flex-col justify-start items-center">
      <HomeComponent />
      <HowItWorks />
      <Explore />
      <SubFeature />
      <Instructor />
      <FAQ />
    </main>
  );
};

export default Home;
