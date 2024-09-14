import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const LiveCourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) => {
 
  

  return (
    <div>
        {children}
        <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
    </div>
  );
};

export default LiveCourseLayout;
