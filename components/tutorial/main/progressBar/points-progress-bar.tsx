import { Progress } from "@/components/ui/progress"
import { Award } from 'lucide-react'

interface PointsProgressBarProps {
  currentPoints: number
  maxPoints: number
}

const PointsProgressBar: React.FC<PointsProgressBarProps> = ({ currentPoints, maxPoints }) => {
  const progress = (currentPoints / maxPoints) * 100

  return (
    <div className="flex items-center space-x-3 border  p-2 rounded-md shadow-sm">
      <div className="relative flex-shrink-0">
        <div className="bg-purple-500 rounded-full p-1.5">
          <Award className="w-5 h-5 text-white" />
        </div>
      
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between mb-1 text-xs">
          <span className="font-semibold text-sm text-purple-400 truncate">Points</span>
          <span className="font-semibold text-sm text-purple-400">{currentPoints}/{maxPoints}</span>
        </div>
        {/* @ts-ignore */}
        <Progress value={progress} className="w-full h-2" indicatorClassName="bg-purple-500" />
      </div>
    </div>
  )
}

export default PointsProgressBar