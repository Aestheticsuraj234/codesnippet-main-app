"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"
import { AlertCircle, CheckCircle2, Clock, Mail } from "lucide-react"

interface FeedbackCardProps {
  category: string
  description: string
  priority: "HIGH" | "MEDIUM" | "LOW" | "default" | "destructive" | "outline" | "secondary"
  status: "completed" | "in-progress" | "pending" | "resolved" | "HIGH" | "MEDIUM" | "LOW" | "default" | "destructive" | "outline" | "secondary" | "brand" | "ACTIVE" | "INACTIVE" | "PUBLISHED" | "ARCHIVED" | "UNPUBLISHED" | "EASY" | "HARD" | undefined
  email: string
  createdAt: Date
}


export function FeedbackCard({
  category,
  description,
  priority,
  status,
  email,
  createdAt,
}: FeedbackCardProps) {
  return (
    <Card className="w-full max-w-2xl transform transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="text-xs capitalize">
            {category}
          </Badge>
          <Badge 
            variant={priority}
            className="text-xs capitalize"
          >
            {priority}
          </Badge>
          <Badge 
        //   @ts-ignore
            variant={status}
            className="text-xs capitalize"
          >
            {status}
          </Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="mr-1 h-4 w-4" />
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>{email}</span>
          </div>
          <div className="flex items-center space-x-2">
            {status === "completed" ? (
              <div className="flex items-center text-green-500">
                <CheckCircle2 className="h-4 w-4 mr-1" />
                <span className="text-sm">Resolved</span>
              </div>
            ) : (
              <div className="flex items-center text-yellow-500">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span className="text-sm">In Progress</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}