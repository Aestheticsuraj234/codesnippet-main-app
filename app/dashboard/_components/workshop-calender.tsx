import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, Video, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Workshop {
  id: string
  title: string
  description: string
  image: string
  startDate: Date
  isRecorded: boolean
  isPurchased: boolean
  progress?: number
}

interface WorkshopCalendarProps {
  workshops: Workshop[]
}

const WorkshopCalendar = ({ workshops }: WorkshopCalendarProps) => {
  // Format date to readable format
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  // Format time to readable format
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <CardTitle className="text-2xl font-bold">Upcoming Workshops</CardTitle>
          </div>
          <Link href="/dashboard/workshops">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {workshops.map((workshop) => (
            <div
              key={workshop.id}
              className="flex flex-col md:flex-row gap-4 p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
            >
              <div className="relative h-32 md:h-auto md:w-48 rounded-md overflow-hidden">
                <Image src={workshop.image || "/placeholder.svg"} alt={workshop.title} fill className="object-cover" />
                {workshop.isRecorded && (
                  <Badge variant="secondary" className="absolute top-2 right-2 flex items-center gap-1">
                    <Video className="h-3 w-3" />
                    Recorded
                  </Badge>
                )}
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg mb-1">{workshop.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{workshop.description}</p>

                  <div className="flex flex-wrap gap-3 mt-2">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(workshop.startDate)}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {formatTime(workshop.startDate)}
                    </div>
                  </div>

                  {workshop.isPurchased && workshop.progress !== undefined && (
                    <div className="mt-3 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium">Progress</span>
                        <span className="text-xs font-medium">{workshop.progress}%</span>
                      </div>
                      <Progress value={workshop.progress} className="h-1.5" />
                    </div>
                  )}
                </div>

                <div className="mt-3">
                  <Link href={`/dashboard/workshops/${workshop.id}`}>
                    <Button variant={workshop.isPurchased ? "default" : "outline"} size="sm" className="gap-1">
                      {workshop.isPurchased ? "Continue" : "View Details"}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {workshops.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No upcoming workshops</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default WorkshopCalendar

