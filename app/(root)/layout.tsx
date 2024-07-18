import Script from "next/script";
import { Navbar } from "./_components/navbar";


const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="h-[80px]  fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
     
      <main className="md:pl-56 pt-[80px] h-full relative">{children}</main>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
    </div>
  );
};

export default HomePageLayout;
