import HomeComponent from "@/components/Home/HomeComponent";
import Problem from "@/components/Home/Problem";
import Features from "@/components/Home/Features";
import Pricing from "@/components/Home/Pricing";
import FAQ from "@/components/Home/FAQ";
import CallToAction from "@/components/Home/CallToAction";

export default function Home() {
    return (
      <main className="mx-4 my-2 flex h-full flex-col">
      <HomeComponent />
      <Problem />
      <Features/>
      <Pricing/>
      <FAQ/>
      <CallToAction/>
      </main>
    );
  }
  