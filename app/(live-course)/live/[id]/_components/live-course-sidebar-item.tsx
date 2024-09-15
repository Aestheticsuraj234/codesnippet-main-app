'use client'

import { cn } from '@/lib/utils'
import { CheckCircle, PlayCircle, PauseCircle } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

interface LiveCourseSidebarItemProps {
    id: string
    title: string
    isCompleted: boolean
    liveCourseId: string
  }
  
  export default function LiveCourseSidebarItem({
    id,
    title,
    isCompleted,
    liveCourseId
  }: LiveCourseSidebarItemProps){
    const pathname = usePathname()
    const router = useRouter()
  
    const isActive = pathname?.includes(id)
    const Icon = isCompleted ? CheckCircle : isActive ? PauseCircle : PlayCircle
  
    const onClick = () => {
      router.push(`/live/${liveCourseId}/chapters/${id}`)
    }
    
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 dark:text-slate-100 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive && "text-slate-700 dark:text-slate-200 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700",
        isCompleted && "text-emerald-700 dark:text-emerald-500  hover:text-emerald-700 dark:hover:text-emerald-500",
        isCompleted && isActive && "bg-emerald-200/20  dark:bg-emerald-200/20" 
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            "text-slate-500 dark:text-slate-100",
            isActive && "text-slate-700 dark:text-slate-400",
            isCompleted && "text-emerald-700 dark:text-emerald-500"
          )}
        />
        {title}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-slate-700 dark:border-slate-300   h-full transition-all",
          isActive && "opacity-100",
          isCompleted && "border-emerald-700 dark:border-emerald-500" 
        )}
      />
    </button>
  )
  }