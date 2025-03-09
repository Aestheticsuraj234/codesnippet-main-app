import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Unlock, Calendar, Tag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import Link from "next/link"

export interface CourseCardProps {
  id: string
  date: Date
  imageSrc: string
  price: number
  discountedPrice: number
  isPurchased: boolean
  title: string
  description: string
}

const CourseCard = ({
  id,
  date,
  imageSrc,
  price,
  discountedPrice,
  isPurchased,
  title,
  description,
}: CourseCardProps) => {
  const hasDiscount = discountedPrice !== price
  const discountPercentage = hasDiscount ? Math.round(((price - discountedPrice) / price) * 100) : 0

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg bg-[#F3F4F6] dark:bg-[#27272A] border dark:border-[#3F3F46] border-[#E5E7EB]">
      <CardContent className="p-0">
        {/* Image container with overlay */}
        <div className="relative">
          <div className="aspect-video overflow-hidden">
            <img
              src={imageSrc || "/placeholder.svg"}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              alt={title}
            />
          </div>

          {/* Status badge */}
          <div className="absolute top-3 right-3">
            {isPurchased ? (
              <Badge className="bg-[#676ECC] hover:bg-[#5258B0] text-white">
                <Unlock className="h-3.5 w-3.5 mr-1" />
                Purchased
              </Badge>
            ) : hasDiscount ? (
              <Badge className="bg-green-500 hover:bg-green-600 text-white">
                <Tag className="h-3.5 w-3.5 mr-1" />
                {discountPercentage}% OFF
              </Badge>
            ) : null}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Date */}
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <Calendar className="h-3.5 w-3.5 mr-1.5" />
            {formatDate(date)}
          </div>

          {/* Title and description */}
          <div className="space-y-2 mb-4">
            <h3 className="text-lg font-bold line-clamp-1 group-hover:text-[#676ECC] transition-colors" title={title}>
              {title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
          </div>

          {/* Price and action */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t dark:border-[#3F3F46] border-[#E5E7EB]">
            <div className="flex items-center gap-2">
              {isPurchased ? (
                <div className="flex items-center text-[#676ECC] font-medium">
                  <Unlock className="h-4 w-4 mr-1" />
                  Unlocked
                </div>
              ) : (
                <div className="flex flex-col">
                  {hasDiscount && (
                    <span className="text-sm line-through text-muted-foreground">₹{price.toLocaleString("en-IN")}</span>
                  )}
                  <span className="text-lg font-bold text-green-600 dark:text-green-500">
                    ₹{discountedPrice.toLocaleString("en-IN")}
                  </span>
                </div>
              )}
            </div>

            {isPurchased ? (
              <Link href={`/live/${id}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="group-hover:bg-[#676ECC] group-hover:text-white transition-colors"
                >
                  Start Course
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            ) : (
              <Link href={`/live-course/${id}`}>
                <Button variant="brand" size="sm" className="bg-[#676ECC] hover:bg-[#5258B0] text-white">
                  Buy Course
                </Button>
              </Link>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CourseCard

