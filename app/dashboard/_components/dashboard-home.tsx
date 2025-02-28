import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, MessageSquare, CheckCircle, Users, ThumbsUp, CalendarDays, Star } from "lucide-react"
import Link from 'next/link'

// @ts-ignore
const ProgressOverview = ({ user }) => {
  const coursesCompleted =  34
  const totalCourses =  50 // Assume there are 50 total courses
  const problemsSolved =    80
  const totalProblems = 100 // Assume there are 100 total problems

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span>Courses Completed</span>
            <span>{coursesCompleted}/{totalCourses}</span>
          </div>
          <Progress value={(coursesCompleted / totalCourses) * 100} />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span>Problems Solved</span>
            <span>{problemsSolved}/{totalProblems}</span>
          </div>
          <Progress value={(problemsSolved / totalProblems) * 100} />
        </div>
      </CardContent>
    </Card>
  )
}
// @ts-ignore

const RecentActivity = ({ user }) => {
  const activities = [
    { icon: BookOpen, text: "Started a new course: Advanced React", date: "2 days ago" },
    { icon: MessageSquare, text: "Posted a doubt in JavaScript forum", date: "3 days ago" },
    { icon: CheckCircle, text: "Completed Chapter 3 of Node.js Basics", date: "1 week ago" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity, index) => (
            <li key={index} className="flex items-center space-x-3">
              <activity.icon className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">{activity.text}</p>
                <p className="text-xs text-muted-foreground">{activity.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

// @ts-ignore
const CommunityEngagement = ({ user }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Community Engagement</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-4 text-center">
        <div>
          <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
          <p className="text-2xl font-bold">{21}</p>
          <p className="text-xs text-muted-foreground">Communities Joined</p>
        </div>
        <div>
          <MessageSquare className="h-8 w-8 mx-auto mb-2 text-primary" />
          <p className="text-2xl font-bold">{90}</p>
          <p className="text-xs text-muted-foreground">Discussions</p>
        </div>
        <div>
          <ThumbsUp className="h-8 w-8 mx-auto mb-2 text-primary" />
          <p className="text-2xl font-bold">{12}</p>
          <p className="text-xs text-muted-foreground">Helpful Votes</p>
        </div>
      </CardContent>
    </Card>
  )
}

// @ts-ignore
const UpcomingWorkshops = ({ user }) => {
  const workshops = [
    { workshopDay: { title: "React Workshop", date: "2022-06-10" } },
    { workshopDay: { title: "Node.js Workshop", date: "2022-06-15" } },
    { workshopDay: { title: "GraphQL Workshop", date: "2022-06-20" } },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Workshops</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {workshops.map((workshop, index) => (
            <li key={index} className="flex items-center space-x-3">
              <CalendarDays className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">{workshop.workshopDay.title}</p>
                <p className="text-xs text-muted-foreground">{new Date(workshop.workshopDay.date).toLocaleDateString()}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

// @ts-ignore

const PointsOverview = ({ user }) => {
  const totalPoints = 90
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Points</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center space-x-2">
          <Star className="h-8 w-8 text-yellow-400" />
          <p className="text-4xl font-bold">{totalPoints}</p>
        </div>
        <p className="text-center text-muted-foreground mt-2">Total Points Earned</p>
      </CardContent>
    </Card>
  )
}
// @ts-ignore

export default function DashboardHome({ user }) {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Hello🔥 {user.name}</h1>
          <p className="text-xl text-muted-foreground">Welcome to your learning dashboard</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ProgressOverview user={user} />
          <RecentActivity user={user} />
          <CommunityEngagement user={user} />
          
          <Card className="col-span-2 row-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Current Course Progress</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/courses">View All Courses</Link>
              </Button>
            </CardHeader>
            <CardContent>
           
        
              {user.coursePurchase.slice(0, 3).map(
                // @ts-ignore
                (course, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{course.course.title}</span>
                    <span className="text-muted-foreground">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} />
                </div>
              ))}
            </CardContent>
          </Card>
          
          <UpcomingWorkshops user={user} />
          <PointsOverview user={user} />
        </div>
      </main>
    </div>
  )
}