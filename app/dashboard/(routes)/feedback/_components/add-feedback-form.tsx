"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { MessageSquare, AlertTriangle, Send, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { useCurrentUser } from "@/hooks/auth/use-current-user"
import { Textarea } from "@/components/ui/textarea"
import { AddFeeback } from "@/action/feedback"


// Define the form schema with Zod
export const AddFeedbackSchema = z.object({
  category: z.enum(["EDITORIAL", "TOPICS", "TECH", "VIDEO", "OTHER"], {
    required_error: "Please select a category",
  }),
  priority: z.enum(["HIGH", "MEDIUM", "LOW"], {
    required_error: "Please select a priority level",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
})

type FormValues = z.infer<typeof AddFeedbackSchema>

// Server action to submit feedback


export default function AddFeedbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  // This should be replaced with your actual useCurrentUser hook
  const user = useCurrentUser() 

  const form = useForm<FormValues>({
    resolver: zodResolver(AddFeedbackSchema),
    defaultValues: {
      category: undefined,
      priority: undefined,
      description: "",
      email: user?.email || "",
    },
  })

  async function onSubmit(data: FormValues) {
  try {
    setIsSubmitting(true)
    const res = await AddFeeback(data);
    console.log(res)
    toast("Feedback submitted successfully");
    form.reset();
  } catch (error) {
    console.log(error);
    toast("Failed to submit feedback");
  }finally{
    setIsSubmitting(false)
  }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <CardTitle className="text-2xl font-bold">Submit Feedback</CardTitle>
        </div>
        <CardDescription>Share your thoughts, suggestions, or report issues to help us improve</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="EDITORIAL">Editorial</SelectItem>
                        <SelectItem value="TOPICS">Topics</SelectItem>
                        <SelectItem value="TECH">Technical</SelectItem>
                        <SelectItem value="VIDEO">Video</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Select the area your feedback relates to</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="HIGH" className="flex items-center">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-destructive" />
                            <span>High</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="MEDIUM">Medium</SelectItem>
                        <SelectItem value="LOW">Low</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>How urgent is this feedback?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" {...field} disabled />
                  </FormControl>
                  <FormDescription>We will use this to follow up on your feedback</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please describe your feedback in detail..."
                      className="min-h-[120px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide as much detail as possible to help us understand your feedback
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 border-t pt-6">
        <Button variant="outline" onClick={() => form.reset()}>
          Cancel
        </Button>
        <Button onClick={form.handleSubmit(onSubmit)} disabled={isSubmitting} className="gap-2">
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Submit Feedback
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
