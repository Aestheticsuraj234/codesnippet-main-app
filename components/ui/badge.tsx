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
        brand: "bg-[#eed43c] text-[#1e201f] border-[#eed43c]",
        ACTIVE: "bg-[#05ab37] text-white border-[#05ab37]",
        INACTIVE: "bg-red-500 text-white border-red-500",
        PUBLISHED: "bg-[#03DC7A] text-[#fff]",
        ARCHIVED: "bg-[#FF6347] text-[#fff]",
        UNPUBLISHED: "bg-[#FF0000] text-[#fff]",
        EASY: "bg-[#03DC7A] text-[#fff]",
        MEDIUM: "bg-[#FFC000] text-[#fff]",
        HARD: "bg-[#FF0000] text-[#fff]",
        PENDING: "bg-[#FFC000] text-[#fff]",
        DONE: "bg-[#03DC7A] text-[#fff]",
        MISSED: "bg-[#FF0000] text-[#fff]",
        COMPLETED: "bg-[#03DC7A] text-[#fff]",
        FAILED: "bg-[#FF0000] text-[#fff]",
        // Feedback Category Colors
        EDITORIAL: "bg-[#3B82F6] text-white border-[#3B82F6]",
        TOPICS: "bg-[#8B5CF6] text-white border-[#8B5CF6]",
        TECH: "bg-[#10B981] text-white border-[#10B981]",
        VIDEO: "bg-[#F59E0B] text-white border-[#F59E0B]",
        OTHER: "bg-[#6B7280] text-white border-[#6B7280]",
        // Feedback Priority Colors
        HIGH: "bg-[#EF4444] text-white border-[#EF4444]",
        LOW: "bg-[#10B981] text-white border-[#10B981]",
        // Feedback Status Colors
        IN_PROGRESS: "bg-[#3B82F6] text-white border-[#3B82F6]",
        REJECTED: "bg-[#DC2626] text-white border-[#DC2626]",
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