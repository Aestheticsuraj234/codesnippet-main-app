import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Layers, Lock, ArrowRight } from "lucide-react"

interface TechnologyDashboardCardProps {
  id: string
  imageUrl: string
  name: string
  description: string
  numberOfTopics: number
  isPremiumUser: boolean
  progress: number
}

const TechnologyDashboardCard = ({
  id,
  imageUrl,
  name,
  description,
  numberOfTopics,
  isPremiumUser,
  progress,
}: TechnologyDashboardCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="relative h-40 w-full">
        <Image src={imageUrl || "/placeholder.svg"} alt={name} fill className="object-cover" />
        {!isPremiumUser && (
          <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm p-1.5 rounded-full">
            <Lock className="h-4 w-4 text-primary" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      <CardContent className="pt-4">
        <div className="flex items-center gap-2 mb-2">
          <Layers className="h-4 w-4 text-primary" />
          <p className="text-xs text-muted-foreground">{numberOfTopics} Topics</p>
        </div>

        <h3 className="font-bold text-lg mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>

        <div className="mt-4 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium">Progress</span>
            <span className="text-xs font-medium">{progress || 0}%</span>
          </div>
          <Progress value={progress || 0} className="h-1.5" />
        </div>
      </CardContent>

      <CardFooter className="pt-0">
     
        {
          isPremiumUser ? (
            <Link href={`/dashboard/tutorials/${id}`} className="w-full">
            <Button variant="outline" className="w-full gap-1 mt-2">
              Continue Learning <ArrowRight className="h-4 w-4" />
            </Button>
            </Link>
          ) : (
            <Link href={`/pricing`} className="w-full">
            <Button variant="outline" className="w-full gap-1 mt-2">
              Unlock <ArrowRight className="h-4 w-4" />
            </Button>
            </Link>
          )
        }
          
    
      </CardFooter>
    </Card>
  )
}

export default TechnologyDashboardCard

