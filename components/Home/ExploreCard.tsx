"use client"

import type { LucideIcon } from "lucide-react"
import Link from "next/link"
import { HoverEffect } from "../ui/card-hover-effect"

interface ExploreCardProps {
  Icon: LucideIcon
  backgroundHex: string
  colorHex: string
  title: string
  description: string
  href: string
}

export function ExploreCard({ Icon, backgroundHex, colorHex, title, description, href }: ExploreCardProps) {
  return (
    <Link href={href}>
      <HoverEffect
        items={[
          {
            title,
            description,
            link: href,
          },
        ]}
      >
        {(item) => (
          <div
            className="flex flex-col items-center justify-center p-6 rounded-xl"
            style={{ backgroundColor: backgroundHex }}
          >
            <Icon size={48} color={colorHex} />
            <h3 className="mt-4 text-xl font-semibold text-center" style={{ color: colorHex }}>
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-center text-gray-700">{item.description}</p>
          </div>
        )}
      </HoverEffect>
    </Link>
  )
}

