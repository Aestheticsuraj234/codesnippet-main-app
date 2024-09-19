"use client";
// import { get_all_content } from "@/action/content";
import SubFeature from "@/components/Home/SubFeature";
import Instructor from "@/components/Home/Instructor";
import FAQ from "@/components/Home/FAQ";
import HomeComponent from "@/components/Home/HomeComponent";
import HowItWorks from "@/components/Home/HowItWorks";
import Explore from "@/components/Home/Explore";
import { useEffect } from "react";

const Home=()=>{
  const refCode = new URLSearchParams(window.location.search).get("ref");

   useEffect(() => {
    // if we have ref code, we will save it in local storage
    if (refCode) {
      localStorage.setItem("refCode", refCode);
    }

  } , [
    refCode
  ]);



    return (
      <main className="mx-10 mt-20 mb-10 flex h-full flex-col justify-start items-center ">
        <HomeComponent/>
        <HowItWorks/>
        <Explore/>
        <SubFeature />
        <Instructor/>
        <FAQ/>
      </main>
    );
  }
  

export default Home;