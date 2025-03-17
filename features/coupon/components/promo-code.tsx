"use client"

import { CalendarClock, Percent, Tag } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import type { CouponType } from "@prisma/client"
import { motion } from "framer-motion"

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
}

export function PromoCoupon({ coupon, onApplyCoupon, disabled = false }: PromoCouponProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    //   @ts-ignore
      className="w-full max-w-md mx-auto mt-4"
    >
      <div className="text-sm font-medium text-zinc-400 mb-2">Special Offer</div>
      <div className="p-3 rounded-lg border border-[#08BD80]/30 bg-[#08BD80]/10 hover:bg-[#08BD80]/15 transition-colors">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <Tag className="h-4 w-4 text-[#08BD80]" />
              <span className="font-mono font-medium text-white">{coupon.code}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-zinc-300">
              <div className="flex items-center gap-1">
                <Percent className="h-3.5 w-3.5 text-[#08BD80]" />
                <span>{coupon.discountPercentage}% off</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarClock className="h-3.5 w-3.5 text-[#08BD80]" />
                <span>Expires {format(new Date(coupon.endDate), "MMM d, yyyy")}</span>
              </div>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="border-[#08BD80]/50 bg-[#08BD80]/20 hover:bg-[#08BD80]/30 hover:border-[#08BD80] text-white"
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

