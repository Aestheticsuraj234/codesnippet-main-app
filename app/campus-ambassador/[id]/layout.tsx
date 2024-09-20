import Script from "next/script";
import { Sidebar } from "../_components/sidebar";
import { Navbar } from "@/app/(root)/_components/navbar";


const CampusAmbassadorDashboardLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) => {
  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar/>
      </div>
      <main className="md:pl-56 pt-[80px] h-full relative bg-[#fff]  dark:bg-[#141413]">
        {children}
      </main>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
    </div>
  );
};

export default CampusAmbassadorDashboardLayout;
