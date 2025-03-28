"use client"

import { useEffect, useState } from "react"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Navbar } from "@/app/(root)/_components/navbar"

export default function PaymentSuccess() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/dashboard"
    }, 3000)

    // Animate progress bar
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          return 100
        }
        return prevProgress + 4
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <div className="h-[80px] fixed inset-x-0 top-0 w-full z-50">
        <Navbar />
      </div>

      {/* Progress bar at the top */}
      <div className="fixed top-[80px] inset-x-0 z-40">
        <Progress value={progress} className="h-1 rounded-none bg-gray-200 dark:bg-zinc-700">
          <div className="h-full bg-gradient-to-r from-[#08BD80] to-[#0EB377]" style={{ width: `${progress}%` }} />
        </Progress>
      </div>

      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        //   @ts-ignore
          className="max-w-md w-full mx-auto rounded-2xl overflow-hidden shadow-xl"
        >
          {/* Top colored section */}
          <div className="bg-gradient-to-r from-[#08BD80] to-[#0EB377] p-8 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.1,
              }}
            >
              <CheckCircle2 className="h-24 w-24 text-white mb-6" strokeWidth={1.5} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
                 //   @ts-ignore
              className="text-3xl md:text-4xl font-bold text-white mb-2 text-center"
            >
              Payment Successful
            </motion.h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "40%" }}
              transition={{ delay: 0.5 }}
                 //   @ts-ignore
              className="h-1 bg-white/30 rounded-full mb-4"
            />
          </div>

          {/* Bottom white section */}
          <div className="bg-white dark:bg-black p-8">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm text-gray-600 dark:text-gray-400">Redirecting in 3 seconds</span>
              <span className="text-sm font-medium text-[#08BD80]">{progress}%</span>
            </div>

            <p className="text-gray-800 dark:text-gray-200 mb-6 text-center">
              Thank you for your purchase! We are redirecting you to the dashboard where you can access your new content.
            </p>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/dashboard")}
                className="border-[#08BD80] text-[#08BD80] hover:bg-[#08BD80]/10"
              >
                Go to Dashboard Now
              </Button>

              <Button
                onClick={() => (window.location.href = "/dashboard")}
                className="bg-gradient-to-r from-[#08BD80] to-[#0EB377] hover:from-[#0EB377] hover:to-[#08BD80] text-white"
              >
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}

// This is a placeholder component - replace with your actual Navbar

