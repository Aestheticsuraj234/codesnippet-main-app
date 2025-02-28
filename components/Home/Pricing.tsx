import { Gift } from "lucide-react";
import React from "react";
import PricingCard from "../Global/Cards/PricingCard";
import { FeatureDataPopular, FeatureData } from "@/constants/FeatureData";

const Pricing = () => {
  return (
    <section id="pricing" className="flex px-2  bg-zinc-900  flex-col justify-center items-center gap-11 mt-10  rounded-md  pb-10 ">
      <h4 className="items-center pt-10 justify-center uppercase flex text-center font-semibold text-md  text-yellow-500 ">
        Pricing that makes 🌟Sigma-Coders🌟 affordable
      </h4>

      <h1 className="font-extrabold text-[#E5ECEA] text-2xl lg:text-5xl tracking-tight md:-mb-4 flex flex-col gap-3 items-center lg:items-start">
        Save hours of repetitive code, ship fast, get profitable!
      </h1>
      <div className="text-white flex ">
        <span className="text-green-500 flex flex-row justify-center gap-1 items-center px-2">
          {" "}
          <Gift /> ₹1999 off
        </span>{" "}
        for the first 1999 customers
      </div>

      <div className="flex justify-center items-center gap-6 ">
        <PricingCard
          id="starter"
          title="Starter"
          actualPrice="₹1999"
          discountedPrice="₹1500"
          // @ts-ignore
          features={FeatureData}
          isPopular={false}
        />
        <PricingCard
          id="pro"
          title="Pro"
          actualPrice="₹2999"
          discountedPrice="₹1999"
          // @ts-ignore
          features={FeatureDataPopular}
          isPopular={true}
        />
      </div>
    </section>
  );
};

export default Pricing;
