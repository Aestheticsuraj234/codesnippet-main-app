"use client"

import { CalendarClock, Percent, Tag } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import type { CouponType } from "@prisma/client"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface PromoCouponProps {
  coupon: {
    id: string
    code: string
    discountPercentage: number
    type: CouponType
    endDate: Date
  }
  onApplyCoupon: (code: string) => void
  disabled?: boolean
  className?: string
}

export function PromoCoupon({ 
  coupon, 
  onApplyCoupon, 
  disabled = false,
  className 
}: PromoCouponProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
            // @ts-ignore
      className={cn("w-full max-w-md mx-auto mt-4", className)}
    >
      <div className="text-sm font-medium text-muted-foreground mb-2">
        Special Offer
      </div>
      <div className="p-3 rounded-lg border border-emerald-500/30 dark:border-emerald-400/30 bg-emerald-50/90 dark:bg-emerald-950/50 hover:bg-emerald-100/90 dark:hover:bg-emerald-950/70 transition-colors">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <Tag className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span className="font-mono font-medium text-foreground">
                {coupon.code}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Percent className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{coupon.discountPercentage}% off</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarClock className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>
                  Expires {format(new Date(coupon.endDate), "MMM d, yyyy")}
                </span>
              </div>
            </div>
          </div>
          <Button
            size="sm"
            className="border-emerald-500/50 dark:border-emerald-400/50 bg-emerald-100/90 dark:bg-emerald-950/90 hover:bg-emerald-200/90 dark:hover:bg-emerald-900/90 hover:border-emerald-600 dark:hover:border-emerald-400 text-emerald-900 dark:text-emerald-100"
            onClick={() => onApplyCoupon(coupon.code)}
            disabled={disabled}
          >
            Apply
          </Button>
        </div>
      </div>
    </motion.div>
  )
}