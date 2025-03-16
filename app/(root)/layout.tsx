import Script from "next/script";
import { Navbar } from "./_components/navbar";
import { Footer } from "@/components/Global/Footer";
import { BannerDisplay } from "@/features/banner/components/banner-display";


const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
    <BannerDisplay/>
      <div className="h-[80px]  fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
     
      <main className="" >{children}</main>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <Footer />
    </>
  );
};

export default HomePageLayout;
