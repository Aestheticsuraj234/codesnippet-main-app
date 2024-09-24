import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen, ChevronRight, Trophy } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface TechnologyCardProps {
  imageUrl: string
  name: string
  id: string
  description: string
  numberOfTopics: number
  isPremiumUser: boolean
  progress: number
}

export default function TechnologyDashboardCard({
  imageUrl,
  name,
  id,
  description,
  numberOfTopics,
  isPremiumUser,
  progress,
}: TechnologyCardProps) {
  return (
    <Card className="overflow-hidden bg-[#F3F4F6] dark:bg-[#27272A] border dark:border-[#3F3F46] border-[#E5E7EB]">
      <CardContent className="p-6 dark:bg-[#18181B] bg-[#fff]">
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative h-16 w-16 flex-shrink-0">
            <Image
              alt={`${name} logo`}
              className="object-cover rounded-full"
              src={imageUrl}
              fill
              sizes="(max-width: 64px) 100vw, 64px"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
              {name}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              {description}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <Badge variant="secondary" className="flex items-center space-x-1">
            <BookOpen size={14} />
            <span>{numberOfTopics} Topics</span>
          </Badge>
          <div className="flex items-center space-x-2">
            <Trophy size={16} className="text-yellow-500" />
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {progress}% Complete
            </span>
          </div>
        </div>
        <Progress value={progress} className="h-2 w-full bg-zinc-200 dark:bg-zinc-700" />
      </CardContent>
      <CardFooter className="dark:bg-[#18181B] bg-[#fff]">
        {isPremiumUser ? (
          <Link href={`/tutorial/${id}`} className="w-full">
            <Button variant="brand" size="lg" className="w-full">
              Continue Learning
              <ChevronRight size={16} className="ml-2" />
            </Button>
          </Link>
        ) : (
          <Link href="/pricing" className="w-full">
            <Button variant="default" size="lg" className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600">
              Subscribe to Unlock
              <ChevronRight size={16} className="ml-2" />
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}