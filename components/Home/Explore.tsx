"use client"

import { cn } from "@/lib/utils"
import { Briefcase, GraduationCap, Handshake, MessageCircle, School, Youtube } from "lucide-react"
import Link from "next/link"
import type React from "react"
import { Cover } from "../ui/cover"

const features = [
  {
    title: "Live Courses",
    description: "Explore live courses to learn the latest technologies",
    href: "/dashboard/courses",
    icon: School,
  },
  {
    title: "Workshops",
    description: "Join live and recorded workshops on cutting-edge topics",
    href: "/dashboard/workshops",
    icon: Briefcase,
  },
  {
    title: "Tutorials",
    description: "Access a wide range of tutorials to enhance your skills",
    href: "/dashboard/tutorials",
    icon: Youtube,
  },
  {
    title: "Community Support",
    description: "Connect with peers and experts in our vibrant community",
    href: "/discussion",
    icon: MessageCircle,
  },
  {
    title: "Campus Ambassador",
    description: "Become a campus ambassador and lead the tech revolution",
    href: "/dashboard/campus-ambassador",
    icon: GraduationCap,
  },
  {
    title: "1:1 Mentorship",
    description: "Get personalized guidance from industry experts",
    href: "/dashboard/mentorship",
    icon: Handshake,
  },
]

export function Explore() {
  return (
    <div className="h-screen w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex flex-col items-center justify-center">
       <div className="absolute inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none"></div>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-neutral-800 dark:text-neutral-100">
          Explore<Cover> Our Offerings</Cover> 
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

const Feature = ({
  title,
  description,
  icon: Icon,
  index,
  href,
}: {
  title: string
  description: string
  icon: React.ElementType
  index: number
  href: string
}) => {
  return (
    <Link href={href} className="block">
      <div
        className={cn(
          "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
          (index === 0 || index === 3) && "lg:border-l dark:border-neutral-800",
          index < 3 && "lg:border-b dark:border-neutral-800",
        )}
      >
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
        <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
          <Icon size={24} />
        </div>
        <div className="text-lg font-bold mb-2 relative z-10 px-10">
          <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-green-500 transition-all duration-200 origin-center" />
          <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
            {title}
          </span>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">{description}</p>
      </div>
    </Link>
  )
}

