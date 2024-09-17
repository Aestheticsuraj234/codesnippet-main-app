import React from 'react'
import { Progress } from "@/components/ui/progress"
import { Trophy } from 'lucide-react'

interface SubTopicProgressBarProps {
  completedSubTopics: number
  totalSubTopics: number
}

const SubTopicProgressBar: React.FC<SubTopicProgressBarProps> = ({ completedSubTopics, totalSubTopics }) => {
    const progress = (completedSubTopics / totalSubTopics) * 100
  
    return (
      <div className="flex items-center space-x-3  p-2 rounded-md shadow-sm bg-[#F3F4F6] dark:bg-[#27272A] border dark:border-[#3F3F46] border-[#E5E7EB]">
        <div className="relative flex-shrink-0">
          <div className="bg-yellow-500 rounded-full p-1.5">
            <Trophy className="w-5 h-5 text-white" />
          </div>
         
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between mb-1 text-xs">
            <span className="font-semibold text-sm text-yellow-600 truncate">
                Completion Progress
            </span>
            <span className="font-semibold text-sm text-yellow-600">{completedSubTopics}/{totalSubTopics}</span>
          </div>
          <Progress value={progress} className="w-full h-2" indicatorClassName="bg-yellow-500" />
        </div>
      </div>
    )
  }

export default SubTopicProgressBar