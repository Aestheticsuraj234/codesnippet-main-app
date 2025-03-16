"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { CountdownTimer } from "./countdown-timer"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface BannerProps {
  id: string
  title: string
  description: string
  endDate: Date
}

export function Banner({ id, title, description, endDate }: BannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  // Check if the banner is already dismissed in localStorage
  useState(() => {
    const dismissedBanners = JSON.parse(localStorage.getItem("dismissedBanners") || "[]")
    if (dismissedBanners.includes(id)) {
      setIsVisible(false)
    }
  })

  const handleDismiss = () => {
    setIsVisible(false)

    // Store dismissed banner ID in localStorage
    const dismissedBanners = JSON.parse(localStorage.getItem("dismissedBanners") || "[]")
    dismissedBanners.push(id)
    localStorage.setItem("dismissedBanners", JSON.stringify(dismissedBanners))
  }

  const handleExpire = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-gradient-to-r from-primary/90 to-primary p-4 text-primary-foreground shadow-md",
        "border-[#08bd80] border-b-4 dark:border-[#08bd80]",
        "animate-in fade-in duration-300",
      )}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg md:text-xl">{title}</h3>
          <p className="text-sm md:text-base opacity-90 line-clamp-2">{description}</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex flex-col items-center sm:items-start">
            <span className="text-xs uppercase tracking-wider opacity-80 mb-1">Ends in</span>
            <CountdownTimer endDate={endDate} onExpire={handleExpire} className="text-primary-foreground" />
          </div>

          <Button
            variant="brand"
            className="whitespace-nowrap"
            onClick={() => {
              // You can add a link or action here
              console.log("Banner CTA clicked")
            }}
          >
            Learn More
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-6 w-6 rounded-full opacity-70 hover:opacity-100 hover:bg-[#08bd80]"
          onClick={handleDismiss}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss</span>
        </Button>
      </div>
    </div>
  )
}

