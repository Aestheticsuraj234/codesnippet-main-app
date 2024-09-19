"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Rocket, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { PLAN } from "@prisma/client";
import Link from "next/link";
import useIsSubscribed from "@/zustand/useSubscription";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
// import { Spinner } from "@/components/ui/spinner"; // Import a spinner component
import { Loader } from "../loader";
import useReferalCode from "@/zustand/use-referal";

// add type of Razorpay in type of global
declare global {
  interface Window {
    Razorpay: any;
  }
}

type FeatureData = {
  id: number;
  title: string;
  isIncluded: boolean;
};

type PricingCardProps = {
  id: string;
  title: string;
  actualPrice: string;
  discountedPrice: string;
  features: FeatureData[];
  isPopular: boolean;
};

const PricingCard = ({
  id,
  title,
  actualPrice,
  discountedPrice,
  features,
  isPopular,
}: PricingCardProps) => {
  const [isPending, setIsPending] = useState(false);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const { isSubscribed, setIsSubscribed } = useIsSubscribed();
  const user = useCurrentUser();
  const router = useRouter();
  const {referalCode} = useReferalCode();

  const parseAmount = (amount: string) => {
    // Remove any non-numeric characters except for the dot
    return parseFloat(amount.replace(/[^\d.]/g, ""));
  };

  const createOrderId = async () => {
    setIsPending(true);
    try {
      const amount = parseAmount(discountedPrice) * 100; // Convert to the smallest currency unit
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      return data.orderId;
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    } finally {
      setIsPending(false);
    }
  };

  const processPayment = async () => {
    try {
      const orderId: string = await createOrderId();
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Use the correct environment variable
        amount: parseAmount(discountedPrice) * 100,
        currency: "INR",
        name: "Sigma Coders",
        description: `Payment for ${id} plan`,
        order_id: orderId,
        handler: async function (response: any) {
          const data = {
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            userId: user?.id,
            plan: PLAN.PREMIUM,
            referalCode: referalCode || "",
          };

          const result = await fetch("/api/verify", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
          });

          const res = await result.json();
          if (res.isOk) {
            setIsPaymentSuccessful(true);
            setIsSubscribed(true);
            setTimeout(() => {
              window.location.reload();
            }, 3000); // Redirect after 3 seconds
          } else {
            toast(res.message);
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        theme: {
          color: "#212121",
          mode: "dark",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", function (response: any) {
        alert(response.error.description);
      });
      paymentObject.open();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isPaymentSuccessful) {
      const timer = setTimeout(() => {
        router.push("/dashboard");
      }, 3000); // Redirect after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [isPaymentSuccessful, router]);

  if (isPaymentSuccessful) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white">
        <Loader /> {/* Display a spinner while redirecting */}
        <h1 className="text-2xl font-bold mt-4">Payment Successful!</h1>
        <p className="mt-2">Redirecting to your InfoCard...</p>
      </div>
    );
  }

  return (
    <>
      <Card
        className={cn(
          "bg-[#212121] relative w-[30rem] flex flex-col justify-around",
          isPopular ? "border-yellow-500 border-2" : "border-none"
        )}
      >
        {isPopular && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <Badge variant="brand" className="border-none px-4 py-2 text-xs">
              Popular
            </Badge>
          </div>
        )}
        <CardHeader>
          <CardTitle className="font-semibold text-white text-xl">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col justify-between items-start">
            <div className="flex flex-row gap-2">
              <p className="text-[#6B7280] line-through text-xl">
                {actualPrice}
              </p>
              <p className="text-white text-6xl font-bold">
                {discountedPrice}{" "}
                <span className="text-base font-medium text-zinc-400">INR</span>
                <span className="text-base font-extrabold text-emerald-500 mx-2">
                  Monthly
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-2 mt-8">
              {features.map((feature, index) => (
                <CardDescription
                  key={index}
                  className="flex flex-row justify-start items-center gap-2"
                >
                  {feature.isIncluded ? (
                    <Check className="text-[#eed43c] w-6 h-6" />
                  ) : (
                    <X className="text-red-500 w-6 h-6" />
                  )}
                  <span
                    className={cn(
                      "text-base",
                      feature.isIncluded
                        ? "text-white font-semibold"
                        : "text-zinc-400 font-light"
                    )}
                  >
                    {feature.title}
                    {feature.title === "Lifetime updates" &&
                      feature.isIncluded && (
                        <Badge
                          variant="brand"
                          className="text-xs mx-3 border-none"
                        >
                          Coming Soon
                        </Badge>
                      )}
                  </span>
                </CardDescription>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-1 w-full items-center justify-center">
          <Button
            disabled={isPending}
            onClick={processPayment}
            size={"lg"}
            variant={"brand"}
            className="text-sm font-semibold flex items-center justify-center gap-2"
          >
            <Rocket size={20} /> Subscribe
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default PricingCard;
