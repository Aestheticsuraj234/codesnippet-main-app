import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Unlock, Lock } from "lucide-react"
import Link from "next/link"
import { formatDate } from "@/lib/utils"

interface CourseSectionProps {
  id: string
  date: Date
  imageSrc: string
  price: number
  discountedPrice: number
  isPurchased: boolean
  title: string
  description: string
  progress?: number
}

export default function CourseSection({
  id,
  date,
  imageSrc,
  price,
  discountedPrice,
  isPurchased,
  title,
  description,
  progress = 0,
}: CourseSectionProps) {
  return (
    <Card className="cursor-pointer bg-[#F3F4F6] dark:bg-[#27272A] border dark:border-[#3F3F46] border-[#E5E7EB]">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-medium text-muted-foreground">
            {formatDate(date)}
          </div>
          <div className="flex items-center gap-2">
            {isPurchased ? (
              <div className="flex items-center justify-center rounded-full dark:bg-[#676ECC] bg-[#8188EC] p-2 text-white">
                <Unlock className="h-4 w-4" />
              </div>
            ) : (
              <>
                {discountedPrice !== price && (
                  <span className="text-sm line-through text-muted-foreground">
                    ₹{price.toLocaleString("en-IN")}
                  </span>
                )}
                <div className="flex justify-center items-center rounded-full bg-green-500 px-2 py-1 text-sm font-medium text-primary-foreground">
                  ₹{discountedPrice.toLocaleString("en-IN")}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex-grow">
          <div className="aspect-video relative overflow-hidden border dark:border-[#3F3F46] border-[#E5E7EB] rounded-md shadow-md hover:shadow-xl mb-3">
            <img
              src={imageSrc}
              className="object-cover w-full h-full rounded-md"
              alt={title}
            />
          </div>
          <h3 className="text-lg font-bold truncate w-full mb-1" title={title}>
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
        </div>
        <div className="mt-auto">
          {isPurchased ? (
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Link href={`/live/${id}`} className="block w-full">
                <Button variant="brand" className="w-full">
                  Continue Course
                </Button>
              </Link>
            </div>
          ) : (
            <Link href={`/live-course/${id}`} className="block w-full">
              <Button variant="brand" className="w-full bg-brand text-white hover:bg-brand/90">
                Buy Course
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
}