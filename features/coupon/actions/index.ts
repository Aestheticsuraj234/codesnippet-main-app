"use server";
import { db } from "@/lib/db/db";
import { CouponType } from "@prisma/client";



export const validateCouponCode = async (couponCode: string , couponType:CouponType) => {
    const coupon = await db.coupon.findUnique({
        where: {
            code: couponCode,
            type: couponType
        }
    })

    if (!coupon) {
        return {
            valid: false,
            message: "Invalid coupon code"
        }
    }

    if (coupon.endDate < new Date()) {
        return {
            valid: false,
            message: "Coupon code has expired"
        }

    }

    return {
        valid: true,
        message: "Coupon code is valid",
        coupon
    }
}