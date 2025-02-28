"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const HoverEffect = ({
  items,
  className,
  children,
}: {
  items: {
    title: string
    description: string
    link: string
  }[]
  className?: string
  children: (item: { title: string; description: string; link: string }) => React.ReactNode
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseLeave = () => setHoveredIndex(null)
    const container = containerRef.current
    if (container) {
      container.addEventListener("mouseleave", handleMouseLeave)
      return () => {
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className={cn("grid grid-cols-1 py-10", className)}>
      {items.map((item, idx) => (
        <div
          key={item.link}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
        >
          <motion.div
          // @ts-ignore
            className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-300 to-blue-500 opacity-0 group-hover:opacity-100 transition duration-500"
            initial={false}
            animate={hoveredIndex === idx ? { opacity: 1 } : { opacity: 0 }}
          />
          <motion.div
           // @ts-ignore
            className="relative z-10 transition duration-500"
            initial={false}
            animate={hoveredIndex === idx ? { scale: 1.05 } : { scale: 1 }}
          >
            {children(item)}
          </motion.div>
        </div>
      ))}
    </div>
  )
}

