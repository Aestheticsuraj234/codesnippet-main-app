import React from 'react'
import MainDayTabClient from '../../_components/main-day-tab-client'
import { getDayWiseDataWithWorkshopId } from '@/action/workshop'

const DaysIdPage = async (props: {params: Promise<{id: string , dayId: string}>}) => {
  const params = await props.params;

  const WorkdDayData = await getDayWiseDataWithWorkshopId(params.id,params.dayId)

  if(!WorkdDayData){
    return <div>Day not found</div>
  }

  const isMarkasDone = WorkdDayData?.userProgress.length > 0 ? WorkdDayData?.userProgress[0].markedAsDone : false




  return (
    <div className='container pt-8 pb-8 px-4 sm:px-8'>
      <MainDayTabClient
        dayData={WorkdDayData}
        isMarkasDone={isMarkasDone}
      />
    </div>
  )
}

export default DaysIdPage