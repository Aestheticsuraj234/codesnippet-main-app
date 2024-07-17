import { Navbar } from "@/components/Global/Navbar";
import { Footer } from "@/components/Global/Footer";
import React from "react";
import Script from "next/script";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

      <Footer />
    </>
  );
};

export default HomeLayout;
