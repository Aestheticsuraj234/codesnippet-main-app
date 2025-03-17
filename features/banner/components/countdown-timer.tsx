"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface CountdownTimerProps {
  endDate: Date
  onExpire?: () => void
  className?: string
}

export function CountdownTimer({ endDate, onExpire, className }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())
  const [isExpired, setIsExpired] = useState(false)

  function calculateTimeLeft() {
    const difference = +new Date(endDate) - +new Date()

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      }
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      const updatedTimeLeft = calculateTimeLeft()
      setTimeLeft(updatedTimeLeft)

      const isNowExpired =
        updatedTimeLeft.days === 0 &&
        updatedTimeLeft.hours === 0 &&
        updatedTimeLeft.minutes === 0 &&
        updatedTimeLeft.seconds === 0

      if (isNowExpired && !isExpired) {
        setIsExpired(true)
        onExpire?.()
      }
    }, 1000)

    return () => clearTimeout(timer)
  })

  const timeUnits = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Mins" },
    { value: timeLeft.seconds, label: "Secs" },
  ]

  // Determine urgency for styling
  const isUrgent = timeLeft.days === 0 && timeLeft.hours < 24

  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm font-medium",
        isUrgent ? "text-red-500 dark:text-red-500" : "",
        className,
      )}
    >
      {timeUnits.map((unit, index) => (
        <div key={unit.label} className="flex items-center">
          {index > 0 && <span className="mx-1">:</span>}
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "flex items-center justify-center rounded-md px-2 py-1 min-w-[40px]",
                isUrgent ? "bg-red-500 dark:bg-black" : "bg-primary/10 dark:bg-primary/20",
              )}
            >
              <span className="tabular-nums">{unit.value.toString().padStart(2, "0")}</span>
            </div>
            <span className="text-[10px] text-muted-foreground mt-0.5">{unit.label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

