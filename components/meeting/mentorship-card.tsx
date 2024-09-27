"use client";
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useModal } from "@/zustand/use-modal";
import { CalendarIcon, ArrowRight } from "lucide-react" // Import the right arrow icon

interface AvailableSlot {
    id: string
    meetingId: string
    date: Date
    time: Date
    isBooked: boolean
  }

interface MentorshipCardProps {
  title: string
  description: string
  duration: number
  price: number
  availableSlots?: AvailableSlot[]
}

export function MentorshipCard({ title, description, duration, price  , availableSlots}: MentorshipCardProps) {

    const {onOpen , type  , data } = useModal()

  return (
    <Card className="h-full flex flex-col bg-[#F3F4F6] border-[#DDE2EC] dark:bg-[#27272A] dark:border-[#27272A]">
      <CardHeader className="flex flex-col justify-center items-start space-y-2 p-4"> {/* Add padding */}
        <CardTitle className="text-xl text-[#1A1818] dark:text-[#ffffff]">{title}</CardTitle>
        <span className="text-sm font-normal text-[#6B7280] dark:text-[#A1A1AA]">
          {description}
        </span>
      </CardHeader>

      <CardFooter className="p-4 m-4 rounded-md flex justify-between items-center bg-[#FFFFFF] dark:bg-[#18181B]">
        {/* Left section with icon and meeting details */}
        <div className="flex flex-row items-center gap-3">
          <CalendarIcon size={28} className="text-[#4b5059] dark:text-[#d7dce6]" />
          <div className="flex flex-col">
            <span className="text-base text-[#1A1818] dark:text-[#ffffff]">{duration} mins</span>
            <span className="text-sm text-[#6B7280] dark:text-[#A1A1AA]">Video Meeting</span>
          </div>
        </div>
        
        {/* Right section with price and button */}
        <div className="flex flex-row items-center gap-2">
          <Button
            variant="brand"
            onClick={()=>onOpen("MEETING_OPEN" , {availableSlots})}
            className="flex items-center justify-center gap-2"
          >
            <span className="text-base font-bold text-[#ffffff]">₹{price}</span>
            <ArrowRight className="w-4 h-4 text-[#fff]" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}