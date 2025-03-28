"use client";
import { Explore } from "@/components/Home/Explore";
import FAQ from "@/components/Home/FAQ";
import HeroSection from "@/components/Home/HeroSection";
import { HowItWorks } from "@/components/Home/HowItWorks";
import { FoundersGrid } from "@/components/Home/Instructor";

import { SubFeature } from "@/components/Home/SubFeature";
import { useEffect, useState } from "react";

const Home = () => {
  const [refCode, setRefCode] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const code = new URLSearchParams(window.location.search).get("ref");
      if (code) {
        setRefCode(code);
        localStorage.setItem("ref", code);
      } else {
        const savedRef = localStorage.getItem("ref");
        if (savedRef) setRefCode(savedRef);
      }
    }
  }, []);

  const Founder = [
    {
      quote:
        "CodeSnippet is the only platform that simplifies and innovate the coding experience for software developers.",
      name: "Suraj Kumar Jha",
      designation: "CEO and Co-founder at CodeSnippet",
      src: "/suraj-2.png",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/suraj-jha-875744250/",
        github: "https://github.com/Aestheticsuraj234",
      },
      skills: ["Software Development" , "Mentoring", "Content Creation"],
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Aryan Jha",
      designation: "MD & Co-Founder at CodeSnippet",
      src: "/aryan.png",
      socialLinks: {
        linkedin: "#",
        github: "#",
        twitter:"#"
      },
      skills: ["Cloud Architecture", "DevOps", "Backend Development"],
    },
    // {
    //   quote:
    //     "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
    //   name: "Ashutosh Jha",
    //   designation: "MD & Co-Founder at CodeSnippet",
    //   src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //   socialLinks: {
    //     linkedin: "https://linkedin.com/in/emilywatson",
    //     twitter: "https://twitter.com/emilywatson",
    //   },
    //   skills: ["Operations Management", "Process Optimization", "Leadership"],
    // },
  ];

  return (
    <>
      <HeroSection />
      {/* <HowItWorks /> */}
      <Explore />
      {/* <SubFeature /> */}
      <FoundersGrid founders={Founder} />
      <FAQ />
    </>
  );
};

export default Home;