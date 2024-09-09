'use client'

import { cn } from '@/lib/utils'
import { CheckCircle, PlayCircle, PauseCircle } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

interface CourseSidebarItemProps {
  id: string
  title: string
  isCompleted: boolean
  courseId: string
}

export default function CourseSidebarItem({
  id,
  title,
  isCompleted,
  courseId
}: CourseSidebarItemProps) {
  const pathname = usePathname()
  const router = useRouter()

  const isActive = pathname?.includes(id)
  const Icon = isCompleted ? CheckCircle : isActive ? PauseCircle : PlayCircle

  const onClick = () => {
    router.push(`/courses/${courseId}/days/${id}`)
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive && "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700",
        isCompleted && "text-emerald-700 hover:text-emerald-700",
        isCompleted && isActive && "bg-emerald-200/20"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            "text-slate-500",
            isActive && "text-slate-700",
            isCompleted && "text-emerald-700"
          )}
        />
        {title}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
          isActive && "opacity-100",
          isCompleted && "border-emerald-700"
        )}
      />
    </button>
  )
}