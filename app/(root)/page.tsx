"use client";

import { Explore } from "@/components/Home/Explore";
import FAQ from "@/components/Home/FAQ";
import HeroSection from "@/components/Home/HeroSection";
import { HowItWorks } from "@/components/Home/HowItWorks";
import { AnimatedFounders } from "@/components/Home/Instructor";
import  {SubFeature}  from "@/components/Home/SubFeature";
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
  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sarah Chen",
      designation: "Product Manager at TechFlow",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Emily Watson",
      designation: "Operations Director at CloudScale",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    
    },
   
  ];
 
  return (
    <>
    <HeroSection/>
    <HowItWorks/>
    <Explore/>
    <SubFeature />
    <AnimatedFounders
    Founderss={testimonials}
    />
    <FAQ/>
    </>
  );
};

export default Home;
