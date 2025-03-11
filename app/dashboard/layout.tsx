import Script from "next/script";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { Toaster } from "sonner";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px] h-full relative  dark:bg-[#141413]">{children}
        <Toaster />
      </main>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
    </div>
  );
};

export default DashboardLayout;
