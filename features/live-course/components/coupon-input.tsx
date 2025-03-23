"use client"

import { useState } from "react"
import { Check, Loader2, Tag, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import type { CouponType } from "@prisma/client"
import { validateCouponCode } from "@/features/coupon/actions"

interface CouponInputProps {
  onApplyCoupon: (discount: number, couponCode: string) => void
  onRemoveCoupon: () => void
  disabled?: boolean
  couponType: CouponType
  initialCoupon?: {
    code: string
    discountPercentage: number
  } | null
}

export function CoursesCouponInput({
  onApplyCoupon,
  onRemoveCoupon,
  disabled = false,
  couponType,
  initialCoupon = null,
}: CouponInputProps) {
  const [couponCode, setCouponCode] = useState("")
  const [isValidating, setIsValidating] = useState(false)
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string
    discountPercentage: number
  } | null>(initialCoupon)

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code")
      return
    }

    setIsValidating(true)
    try {
      const data = await validateCouponCode(couponCode, couponType)

      if (data.valid) {
        setAppliedCoupon({
          code: data?.coupon?.code!,
          discountPercentage: data?.coupon?.discountPercentage!,
        })
        onApplyCoupon(data?.coupon?.discountPercentage!, data?.coupon?.code!)
        toast(`Coupon applied! ${data?.coupon?.discountPercentage}% discount`)
      } else {
        toast(data.message || "Invalid or expired coupon code")
      }
    } catch (error) {
      toast("Failed to apply coupon. Please try again.")
    } finally {
      setIsValidating(false)
    }
  }


  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode("")
    onRemoveCoupon()
  }

  return (
    <div className="w-full">
      {!appliedCoupon ? (
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Tag className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              type="text"
              placeholder="Enter coupon code"
              className="pl-10"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              disabled={isValidating || disabled}
            />
          </div>
          <Button onClick={handleApplyCoupon} disabled={isValidating || !couponCode || disabled} variant="secondary">
            {isValidating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Apply"}
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between p-2 bg-muted/50 border rounded-md">
          <div className="flex items-center space-x-2">
            <Check className="h-5 w-5 text-green-500" />
            <span className="font-medium">{appliedCoupon.code}</span>
            <span className="text-green-500">{appliedCoupon.discountPercentage}% OFF</span>
          </div>
          <Button size="sm" variant="ghost" onClick={handleRemoveCoupon} className="h-8 w-8 p-0" disabled={disabled}>
            <X className="h-4 w-4" />
            <span className="sr-only">Remove coupon</span>
          </Button>
        </div>
      )}
    </div>
  )
}

