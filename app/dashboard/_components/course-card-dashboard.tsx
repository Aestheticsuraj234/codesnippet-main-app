import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, CheckCircle, ArrowRight } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface CourseCardDashboardProps {
  id: string
  title: string
  description: string
  date: Date
  price: number
  discountedPrice: number
  imageSrc: string
  isPurchased: boolean
  progress: number
}

const CourseCardDashboard = ({
  id,
  title,
  description,
  date,
  price,
  discountedPrice,
  imageSrc,
  isPurchased,
  progress,
}: CourseCardDashboardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="relative h-40 w-full">
        <Image src={imageSrc || "/placeholder.svg"} alt={title} fill className="object-cover" />
        {isPurchased && (
          <div className="absolute top-2 right-2 bg-green-500/90 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Enrolled
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      <CardContent className="pt-4">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="h-4 w-4 text-primary" />
          <p className="text-xs text-muted-foreground">{formatDate(date)}</p>
        </div>

        <h3 className="font-bold text-lg mb-1 line-clamp-1">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>

        {isPurchased ? (
          <div className="mt-4 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">Progress</span>
              <span className="text-xs font-medium">{progress || 0}%</span>
            </div>
            <Progress value={progress || 0} className="h-1.5" />
          </div>
        ) : (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-lg font-bold"> ₹{discountedPrice}</span>
            {price !== discountedPrice && <span className="text-sm text-muted-foreground line-through"> ₹{price}</span>}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <Link href={isPurchased ?`/live/${id}` :`/live-course/${id}`} className="w-full">
          <Button variant={isPurchased ? "outline" : "default"} className="w-full gap-1 mt-2">
            {isPurchased ? "Continue Learning" : "View Course"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default CourseCardDashboard

