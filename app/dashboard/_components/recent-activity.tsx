import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, BookOpen, Calendar, Award, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const RecentActivity = () => {
  // This would typically come from a database query
  const activities = [
    {
      id: 1,
      type: "course",
      title: "Completed React Fundamentals",
      time: "2 hours ago",
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      id: 2,
      type: "workshop",
      title: "Registered for AWS Workshop",
      time: "Yesterday",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      id: 3,
      type: "achievement",
      title: "Earned JavaScript Badge",
      time: "3 days ago",
      icon: <Award className="h-4 w-4" />,
    },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                {activity.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
        <Button variant="ghost" size="sm" className="w-full mt-4 text-xs">
          View All Activity <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </CardContent>
    </Card>
  )
}

export default RecentActivity

