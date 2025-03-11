import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface DashboardStatsProps {
  icon: ReactNode
  title: string
  value: string
  description: string
  progress?: number
  variant?: "default" | "premium"
}

const DashboardStats = ({ icon, title, value, description, progress, variant = "default" }: DashboardStatsProps) => {
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-200 hover:shadow-md",
        variant === "premium" &&
          "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/20 dark:to-amber-900/20 border-amber-200 dark:border-amber-800/30",
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full bg-primary/10",
              variant === "premium" && "bg-amber-500/20",
            )}
          >
            {icon}
          </div>
          {variant === "premium" && (
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300">
              Premium
            </span>
          )}
        </div>

        <div className="mt-3">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>

          {progress !== undefined && (
            <Progress
              value={progress}
              className={cn("h-1.5 mt-3", variant === "premium" && "bg-amber-200 dark:bg-amber-950")}
            />
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default DashboardStats

