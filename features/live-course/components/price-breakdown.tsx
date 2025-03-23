"use client"

import { ArrowRight, Calculator } from "lucide-react"
import { motion } from "framer-motion"

interface PriceBreakdownProps {
  originalPrice: number
  discountPercentage: number
  couponCode: string
  finalPrice: number
  isVisible: boolean
}

export function CoursePriceBreakdown({
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
// @ts-ignore
      className="w-full rounded-lg border bg-card p-4 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-3">
        <Calculator className="h-4 w-4 text-muted-foreground" />
        <h3 className="font-medium">Price Breakdown</h3>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Original Price</span>
          <span>₹{originalPrice.toFixed(0)}</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Coupon Discount</span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary">{couponCode}</span>
          </div>
          <span className="text-green-500">- ₹{discountAmount.toFixed(0)}</span>
        </div>

        <div className="pt-2 mt-2 border-t">
          <div className="flex justify-between items-center font-medium">
            <span>Final Price</span>
            <div className="flex items-center gap-2">
              <ArrowRight className="h-3.5 w-3.5 text-primary" />
              {/* dont show any decimal */}
                <span>₹{finalPrice.toFixed(0)}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

