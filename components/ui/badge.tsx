import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        brand:"bg-[#eed43c] text-[#1e201f]  border-[#eed43c]",
        ACTIVE: "bg-[#05ab37] text-white border-[#05ab37]",
        INACTIVE: "bg-red-500 text-white border-red-500",
        PUBLISHED:"bg-[#03DC7A] text-[#fff]",
        ARCHIVED:"bg-[#FF6347] text-[#fff]",
        UNPUBLISHED:"bg-[#FF0000] text-[#fff]",
        EASY:"bg-[#03DC7A] text-[#fff]",
        MEDIUM:"bg-[#FFC000] text-[#fff]",
        HARD:"bg-[#FF0000] text-[#fff]",
        PENDING:"bg-[#FFC000] text-[#fff]",
        DONE:"bg-[#03DC7A] text-[#fff]",
        MISSED:"bg-[#FF0000] text-[#fff]",

      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
