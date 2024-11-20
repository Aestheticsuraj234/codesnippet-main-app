'use client'

import React, { useEffect, useState } from 'react'
import { Check, Minus, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { useCurrentUser } from '@/hooks/auth/use-current-user'
import { useRouter } from 'next/navigation'
import useIsSubscribed from '@/zustand/useSubscription'
import useReferalCode from '@/zustand/use-referal'
import { PLAN } from '@prisma/client'

declare global {
  interface Window {
    Razorpay: any;
  }
}

const features = [
  { name: 'AI-Powered Code Generation', description: 'Generate code snippets using advanced AI' },
  { name: 'Real-time Collaboration', description: 'Work together with team members in real-time' },
  { name: 'Advanced Code Analytics', description: 'Get insights into your code quality and performance' },
  { name: 'Custom Themes', description: 'Personalize your coding environment' },
  { name: 'Priority Support', description: '24/7 dedicated support for your needs' },
  { name: 'Offline Mode', description: 'Work without an internet connection' },
  { name: 'Unlimited Projects', description: 'No restrictions on the number of projects' },
  { name: 'API Access', description: 'Integrate our services into your workflow' },
]

const platforms = [
  { name: 'Code-Snippet', price: '₹999', features: [true, true, true, true, true, true, true, true] },
  { name: 'Other Platforms', price: '₹1499+', features: [true, true, false, 'some', 'some', false, 'some', 'some'] },
]

function FeatureIcon({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="h-6 w-6 text-[#08BD80]" />
  if (value === false) return <X className="h-6 w-6 text-red-500" />
  return <Minus className="h-6 w-6 text-yellow-500" />
}

type PricingCardProps = {
  id: string;
  title: string;
  actualPrice: string;
  discountedPrice: string;
 
  isPopular: boolean;
};
const PricingCard = ({
  id,
  title,
  actualPrice,
  discountedPrice,
  isPopular,
}:PricingCardProps) => {
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
        name: "CodeSnippet",
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
  return (
    <Card className="w-full max-w-4xl mx-auto bg-zinc-900 border-zinc-800">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold text-white">Pricing Comparison</CardTitle>
            <CardDescription className="text-zinc-400">
              See how Code-Snippet stands out from the competition
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-[#08BD80] border-[#08BD80]">
            Best Value
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="py-4 px-4 text-left text-sm font-medium text-zinc-400">Features</th>
                {platforms.map((platform) => (
                  <th key={platform.name} className="py-4 px-4 text-left text-sm font-medium text-zinc-400">
                    <div className="font-bold text-white">{platform.name}</div>
                    <div className="text-[#08BD80]">{platform.price}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <motion.tr
                  key={feature.name}
                  className="border-b border-zinc-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <td className="py-4 px-4">
                    <div className="font-medium text-white">{feature.name}</div>
                    <div className="text-sm text-zinc-400">{feature.description}</div>
                  </td>
                  {platforms.map((platform) => (
                    <td key={`${platform.name}-${feature.name}`} className="py-4 px-4">
                      <FeatureIcon value={platform.features[index]} />
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 flex justify-center gap-4">
         
            <Button
             
              size="lg"
              className="bg-[#08BD80] text-zinc-100 hover:bg-[#08BD80]/40 font-bold"
              onClick={() =>processPayment()}
              disabled={isPending}
            >
              Start Your Journey
            </Button>
         
        </div>
      </CardContent>
    </Card>
  )
}

export default PricingCard;
