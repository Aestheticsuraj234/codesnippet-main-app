"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"

interface PriceBreakdownProps {
  originalPrice: number
  discountPercentage: number
  couponCode: string
  finalPrice: number
  isVisible: boolean
}

export function PriceBreakdown({
  originalPrice,
  discountPercentage,
  couponCode,
  finalPrice,
  isVisible,
}: PriceBreakdownProps) {
  if (!isVisible) return null

  const discountAmount = originalPrice * (discountPercentage / 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    //   @ts-ignore
      className="w-full max-w-md mx-auto mt-6 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm"
    >
      <div className="p-4 bg-gradient-to-r from-zinc-900 to-zinc-800 border-b border-zinc-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#08BD80]" />
            <h3 className="font-medium text-white">Price Breakdown</h3>
          </div>
          <div className="px-2 py-1 rounded-full bg-[#08BD80]/20 border border-[#08BD80]/30">
            <span className="text-xs font-medium text-[#08BD80]">{couponCode}</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-zinc-400">Original Price</span>
          <span className="font-medium text-white">₹{originalPrice.toFixed(0)}</span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-400">Discount</span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-[#08BD80]/20 text-[#08BD80]">
              {discountPercentage}% OFF
            </span>
          </div>
          <span className="font-medium text-[#08BD80]">- ₹{discountAmount.toFixed(0)}</span>
        </div>

        <div className="pt-3 mt-3 border-t border-zinc-800">
          <div className="flex justify-between items-center">
            <span className="font-medium text-white">Final Price</span>
            <div className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-[#08BD80]" />
              <span className="text-lg font-bold text-white">₹{finalPrice.toFixed(0)}</span>
            </div>
          </div>
          <div className="mt-1 text-xs text-zinc-500 text-right">
            You save ₹{discountAmount.toFixed(0)} with this coupon
          </div>
        </div>
      </div>
    </motion.div>
  )
}

