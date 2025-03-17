"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface PriceBreakdownProps {
  originalPrice: number
  discountPercentage: number
  couponCode: string
  finalPrice: number
  isVisible: boolean
  className?: string
}

export function PriceBreakdown({
  originalPrice,
  discountPercentage,
  couponCode,
  finalPrice,
  isVisible,
  className
}: PriceBreakdownProps) {
  if (!isVisible) return null

  const discountAmount = originalPrice * (discountPercentage / 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      // @ts-ignore
      className={cn(
        "w-full max-w-md mx-auto mt-6 overflow-hidden rounded-lg border",
        "border-border bg-card/50 backdrop-blur-sm",
        className
      )}
    >
      <div className="p-4 bg-gradient-to-r from-muted/80 to-muted border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-medium text-foreground">Price Breakdown</h3>
          </div>
          <div className="px-2 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800">
            <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
              {couponCode}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Original Price</span>
          <span className="font-medium text-foreground">₹{originalPrice.toFixed(0)}</span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Discount</span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-100/80 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300">
              {discountPercentage}% OFF
            </span>
          </div>
          <span className="font-medium text-emerald-600 dark:text-emerald-400">
            - ₹{discountAmount.toFixed(0)}
          </span>
        </div>

        <div className="pt-3 mt-3 border-t border-border">
          <div className="flex justify-between items-center">
            <span className="font-medium text-foreground">Final Price</span>
            <div className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-lg font-bold text-foreground">
                ₹{finalPrice.toFixed(0)}
              </span>
            </div>
          </div>
          <div className="mt-1 text-xs text-muted-foreground text-right">
            You save ₹{discountAmount.toFixed(0)} with this coupon
          </div>
        </div>
      </div>
    </motion.div>
  )
}