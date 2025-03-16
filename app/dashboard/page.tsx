import { Header } from "@/components/Global/header"
import { currentUser } from "@/lib/auth/data/auth"
import { db } from "@/lib/db/db"
import TechnologyDashboardCard from "./_components/technology-dashboard-card"
import { getProgressForAllCourses, getProgressForAllTechnologies, getProgressForAllWorkshops } from "@/action/dashboard"
import WorkshopCalendar from "./_components/workshop-calender"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getAllCourses } from "@/action/live-course"
import CourseCardDashboard from "./_components/course-card-dashboard"
import { BookOpen, Code, Layers, Calendar, Award, ArrowRight, BarChart3 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import ProgressChart from "./_components/progress-chart"
import DashboardStats from "./_components/dashboard-stats"
import RecentActivity from "./_components/recent-activity"
import { BannerDisplay } from "@/features/banner/components/banner-display"

const Home = async () => {
  const user = await currentUser()

  const technologies = await db.technology.findMany({
    where: {
      status: "PUBLISHED",
    },
    select: {
      id: true,
      image: true,
      name: true,
      description: true,
      topics: {
        select: {
          subTopics: true,
        },
      },
    },
  })

  const subscription = await db.user.findUnique({
    where: {
      id: user?.id,
    },
    select: {
      subscribedTo: {
        select: {
          endDate: true,
          status: true,
          plan: true,
        },
      },
    },
  })

  const progress = await getProgressForAllTechnologies()
  const workshopProgress = await getProgressForAllWorkshops()
  const courseProgress = await getProgressForAllCourses()

  const isPremiumActiveUser =
    (subscription?.subscribedTo?.status === "ACTIVE" &&
      subscription?.subscribedTo?.plan === "PREMIUM" &&
      user?.role === "PREMIUM_USER") ||
    user?.role === "ADMIN"

  const workshop = await db.workshop.findMany({
    where: {
      status: "PUBLISHED",
    },
    select: {
      id: true,
      title: true,
      image: true,
      description: true,
      isRecorded: true,
      startDate: true,
    },
    take: 3,
  })

  const newWorkshop = workshop.map((workshop) => {
    return {
      id: workshop.id,
      title: workshop.title,
      image: workshop.image,
      description: workshop.description,
      isPurchased: isPremiumActiveUser,
      startDate: workshop.startDate,
      isRecorded: workshop.isRecorded,
      progress: workshopProgress.find((p) => p.workshopId === workshop.id)?.progress!,
    }
  })

  const courses = await getAllCourses()

  // Calculate overall progress statistics
  const overallTechProgress = progress.reduce((acc, curr) => acc + (curr.progress || 0), 0) / (progress.length || 1)

  const overallCourseProgress =
    courseProgress.reduce((acc, curr) => acc + (curr.progress || 0), 0) / (courseProgress.length || 1)

  const overallWorkshopProgress =
    workshopProgress.reduce((acc, curr) => acc + (curr.progress || 0), 0) / (workshopProgress.length || 1)

  // Get total counts
  const totalTechnologies = technologies.length
  const totalCourses = courses.length
  const totalWorkshops = workshop.length

  return (
    <section className="flex flex-col flex-1 bg-background">
      <div className="container px-4 py-6">
        <Header
          title={`Welcome back, ${user?.name} 👋`}
          description="Track your learning journey and progress across all technologies and courses"
          />
        

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <DashboardStats
            icon={<Code className="h-5 w-5 text-primary" />}
            title="Technologies"
            value={totalTechnologies.toString()}
            description={`${Math.round(overallTechProgress)}% complete`}
            progress={overallTechProgress}
          />

          <DashboardStats
            icon={<BookOpen className="h-5 w-5 text-primary" />}
            title="Courses"
            value={totalCourses.toString()}
            description={`${Math.round(overallCourseProgress)}% complete`}
            progress={overallCourseProgress}
          />

          <DashboardStats
            icon={<Calendar className="h-5 w-5 text-primary" />}
            title="Workshops"
            value={totalWorkshops.toString()}
            description={`${Math.round(overallWorkshopProgress)}% complete`}
            progress={overallWorkshopProgress}
          />

          <DashboardStats
            icon={<Award className="h-5 w-5 text-primary" />}
            title="Subscription"
            value={isPremiumActiveUser ? "Premium" : "Free"}
            description={isPremiumActiveUser ? "Active" : "Upgrade for more content"}
            variant={isPremiumActiveUser ? "premium" : "default"}
          />
        </div>

        {/* Progress Overview Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mt-8">
          <Card className="col-span-2">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Learning Progress</h3>
                </div>
              </div>
              <ProgressChart
                techProgress={overallTechProgress}
                courseProgress={overallCourseProgress}
                workshopProgress={overallWorkshopProgress}
              />
            </CardContent>
          </Card>

          {/* <RecentActivity /> */}
        </div>

        {/* Technologies Section */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Technologies</h2>
            </div>
            <Link href="/dashboard/tutorials">
              <Button variant="outline" size="sm" className="gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
            {technologies.slice(0, 3).map((technology) => (
              <TechnologyDashboardCard
                key={technology.id}
                imageUrl={technology.image}
                id={technology.id}
                name={technology.name}
                description={technology.description}
                numberOfTopics={technology.topics.length}
                isPremiumUser={isPremiumActiveUser}
                progress={progress.find((p) => p.technologyId === technology.id)?.progress || 0}
              />
            ))}
          </div>
        </div>

        {/* Workshops Section */}
        <div className="mt-10">
         
          <WorkshopCalendar workshops={newWorkshop} />
        </div>

        {/* Courses Section */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Courses</h2>
            </div>
            <Link href="/dashboard/courses">
              <Button variant="outline" size="sm" className="gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
            {courses.slice(0, 3).map((course) => {
              const isPurchased = course.purchaseByUser.length > 0 ? course.purchaseByUser[0].isPurchase : false
              return (
                <CourseCardDashboard
                  id={course.id}
                  date={course.startDate}
                  title={course.title}
                  description={course.description}
                  price={course.price}
                  discountedPrice={course.discount!}
                  imageSrc={course.image}
                  isPurchased={isPurchased}
                  key={course.id}
                  progress={courseProgress.find((p) => p.courseId === course.id)?.progress || 0}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home

