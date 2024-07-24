"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const CircularProgressBar = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    size?: number
    color?: string  // Added color prop for background color
    children?: React.ReactNode
  }
>(({ className, value = 0, size = 40, color = "transparent", children, ...props }, ref) => {
  if (!value) {
    value = 0
  }

  const strokeWidth = 4  // Thinner stroke width
  const radius = (size / 2) - strokeWidth  // Adjust radius for the thinner progress bar
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference * (1 - value / 100)

  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        className
      )}
      style={{ width: size, height: size }}
    >
      <svg
        className="absolute"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Circle */}
        <circle
          className="text-secondary"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={"currentColor"}  // Set the background color // Set the background color
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}  // Set the color for the progress stroke
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          fill="none"
          style={{ transition: 'stroke-dashoffset 0.3s ease' }}  // Smooth transition effect
        />
      </svg>
      {children && <div className="absolute text-center text-sm font-medium z-10">{children}</div>} {/* Added z-10 */}
    </div>
  )
})
CircularProgressBar.displayName = "CircularProgressBar"

export { CircularProgressBar }
