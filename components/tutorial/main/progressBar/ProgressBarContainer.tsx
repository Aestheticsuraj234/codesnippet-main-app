import React from 'react'
import SubTopicProgressBar from './subTopic-progress-bar'
import PointsProgressBar from './points-progress-bar'
import { getPointsOfUser, getProgressOfsubTopic } from '@/action/tutorial'


interface ProgressBarContainerProps {
  technologyId: string
  technology: {
    subTopics: {
      id: string
      isCompleted: boolean
    }[]
    totalPoints: number
    earnedPoints: number
  }
}

const ProgressBarContainer: React.FC<ProgressBarContainerProps> = async({
  technologyId,
  technology
}) => {

    const {totalNumberOfSubTopics , totalNumberOfSubTopicsDone} = await getProgressOfsubTopic(technologyId)
    const {earnedPoints , maxPoints} = await getPointsOfUser(technologyId)


  return (
    <div className="flex flex-col sm:flex-row w-full justify-between items-center gap-12 mt-1">
      <div className="w-full ">
        <SubTopicProgressBar
          completedSubTopics={totalNumberOfSubTopicsDone!}
          totalSubTopics={totalNumberOfSubTopics}
        />
      </div>
      <div className="w-full ">
        <PointsProgressBar
          currentPoints={earnedPoints}
          maxPoints={maxPoints}
        />
      </div>
    </div>
  )
}

export default ProgressBarContainer