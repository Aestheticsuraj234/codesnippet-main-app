"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Navbar } from "@/app/(root)/_components/navbar"
import { CouponType, type Courses } from "@prisma/client"
import { courseData } from "./Jsons/data"
import { useParams, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useCurrentUser } from "@/hooks/auth/use-current-user"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { useAuthModal } from "@/zustand/use-auth-modal"
import { ArrowLeft, Star } from "lucide-react"
import { Hint } from "@/components/Global/hint"
import { CoursesCouponInput } from "@/features/live-course/components/coupon-input"
import { CoursePriceBreakdown } from "@/features/live-course/components/price-breakdown"


interface Props {
  course: Courses
  couponCode?: {
    id: string
    code: string
    discountPercentage: number
    type: CouponType
    endDate: Date
  }
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function LiveCourseLandingPage({ course, couponCode }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const params = useParams()
  const [isPending, setIsPending] = useState(false)
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false)
  const [discountPercentage, setDiscountPercentage] = useState(couponCode ? couponCode.discountPercentage : 0)
  const [appliedCouponCode, setAppliedCouponCode] = useState(couponCode ? couponCode.code : "")
  const [finalPrice, setFinalPrice] = useState(course?.discount || 0)

  const user = useCurrentUser()
  const { status } = useSession()
  const { onOpen, onClose } = useAuthModal()
  const router = useRouter()

  // Calculate final price whenever discount percentage changes
  useEffect(() => {
    if (discountPercentage > 0 && course?.discount) {
      const discount = course.discount * (discountPercentage / 100)
      const newPrice = course.discount - discount
      setFinalPrice(newPrice)
    } else {
      setFinalPrice(course?.discount || 0)
    }
  }, [discountPercentage, course?.discount])

  // Handle applying coupon
  const handleApplyCoupon = (discount: number, couponCode: string) => {
    setDiscountPercentage(discount)
    setAppliedCouponCode(couponCode)
  }

  // Handle removing coupon
  const handleRemoveCoupon = () => {
    setDiscountPercentage(0)
    setAppliedCouponCode("")
  }

  const createOrderId = async () => {
    if (status !== "authenticated") {
      onOpen()
      return
    }
    setIsPending(true)
    try {
      const amount = finalPrice * 100 // Use finalPrice instead of course.discount
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          couponCode: appliedCouponCode || undefined,
        }),
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const data = await response.json()
      console.log(data)
      return data.orderId
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error)
    } finally {
      setIsPending(false)
    }
  }

  const processPayment = async () => {
    try {
      const orderId: string = await createOrderId()
      if (!orderId) return // Handle case where order creation failed

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: finalPrice * 100, // Use finalPrice instead of course.discount
        currency: "INR",
        name: "CodeSnippet",
        description: `Payment for ${course.title}`,
        order_id: orderId,
        handler: async (response: any) => {
          const data = {
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            userId: user?.id,
            courseId: course.id,
            couponCode: appliedCouponCode || undefined,
          }

          const result = await fetch("/api/live-course-verify", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
          })

          const res = await result.json()
          if (res.isOk) {
            setIsPaymentSuccessful(true)
            window.location.href = "/dashboard/courses"
          } else {
            toast(res.message)
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        theme: {
          color: "#212121",
          mode: "dark",
        },
      }

      const paymentObject = new window.Razorpay(options)
      paymentObject.on("payment.failed", (response: any) => {
        toast.error(response.error.description || "Payment failed. Please try again.")
      })
      paymentObject.open()
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong. Please try again.")
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Function to extract the video ID from various YouTube URL formats
  const extractVideoId = (link: string | null) => {
    if (!link) return null
    const videoIdMatch = link.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    )
    return videoIdMatch ? videoIdMatch[1] : null
  }

  const videoId = extractVideoId(course.courseVideoPitchLink) // Extract video ID from the link

  const currentCourseData = courseData.find((data) => data.id === params?.id)

  if (isPaymentSuccessful) {
    // show the loading bar with payment is successful and with the messsage of redirecting to the dashboard
    return (
      <>
       <div className="h-[80px]  fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="min-h-screen bg-white dark:bg-zinc-900 h-screen">
       
        <section className="relative py-20 text-center text-white">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-90"></div>
          <div className="relative container mx-auto px-4">
            <h1 className="mb-4 text-5xl font-extrabold">Payment Successful</h1>
            <p className="mb-8 text-xl">Redirecting to the dashboard...</p>
          </div>
        </section>
      </div>
      </>
    )
  }

  const onBack = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
    <div className="h-[80px]  fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <Hint label="Go Back" side="right" align="center">
        <Button onClick={onBack} variant={"outline"} size={"icon"} className="mx-4 my-4">
          <ArrowLeft size={24} />
        </Button>
      </Hint>
      <section className="relative py-20 text-center dark:text-white text-zinc-800 flex justify-start items-start">
        <div className="absolute inset-0 dark:bg-[#27272A] bg-[#F3F4F6]  opacity-90"></div>

        <div className="relative container mx-auto px-4">
          <h1 className="mb-4 text-5xl font-extrabold">{course.title}</h1>
          <p className="mb-8 text-xl">{course.description}</p>
          <Button disabled={isPending} onClick={processPayment} size="lg" variant="brand">
            Get Started Today
          </Button>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-20 grid gap-12 md:grid-cols-2">
          <div>
            <div className="relative pb-[56.25%]">
              <iframe
                className="absolute top-0 left-0 h-full w-full rounded-lg shadow-lg"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="Course Preview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-3xl font-semibold">Course Overview</h2>
            <p className="mb-6 text-lg text-muted-foreground">{currentCourseData?.CourseOverViewDes}</p>
            <div className="mb-6 grid grid-cols-2 gap-4">
              {currentCourseData?.info.map((info, index) => (
                <div key={index} className="flex items-center space-x-2 text-muted-foreground">
                  <info.icon className="h-5 w-5" color={info.colorHex} />
                  <span>{info.text}</span>
                </div>
              ))}
            </div>
            <Card className="mb-6">
              <CardContent className="p-4">
                <h3 className="mb-2 text-lg font-semibold">Course Highlights</h3>
                <ul className="space-y-2">
                  {currentCourseData?.courseHighlights.map((highlight, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <highlight.icon className={cn("h-5 w-5")} color={highlight.colorHex} />
                      <span>{highlight.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Pricing Card with Coupon Input */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Course Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg">Regular Price</span>
                  <span
                    className={cn(
                      "text-xl font-bold",
                      discountPercentage > 0 ? "line-through text-muted-foreground" : "",
                    )}
                  >
                    ₹{course.discount}
                  </span>
                </div>

                {/* Coupon Input */}
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Have a coupon code?</p>
                  <CoursesCouponInput
                    onApplyCoupon={handleApplyCoupon}
                    onRemoveCoupon={handleRemoveCoupon}
                    disabled={isPending}
                    couponType={CouponType.LIVE_COURSE}
                    initialCoupon={
                      couponCode
                        ? {
                            code: couponCode.code,
                            discountPercentage: couponCode.discountPercentage,
                          }
                        : null
                    }
                  />
                </div>

                {/* Price Breakdown */}
                {discountPercentage > 0 && (
                  <CoursePriceBreakdown
                    originalPrice={course?.discount!}
                    discountPercentage={discountPercentage}
                    couponCode={appliedCouponCode}
                    finalPrice={finalPrice}
                    isVisible={true}
                  />
                )}

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">Final Price</span>
                    <span className="text-2xl font-bold text-primary">₹{finalPrice.toFixed(0)}</span>
                  </div>
                </div>

                <Button variant="brand" disabled={isPending} onClick={processPayment} size="lg" className="w-full mt-4">
                  {isPending ? "Processing..." : `Enroll Now for ₹${finalPrice.toFixed(0)}`}
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="mb-8 text-center text-3xl font-semibold">What You will Learn</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {currentCourseData?.courseOverview.map((feature, index) => (
              <Card key={index} className="transition-all duration-200 hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <feature.icon className="h-6 w-6" color={feature.colorHex} />
                    <span>{feature.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="mb-8 text-center text-3xl font-semibold">Course Curriculum</h2>

          {/* Desktop view */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCourseData?.modules.map((module, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p>{module.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile view */}
          <Accordion type="single" collapsible className="md:hidden">
            {currentCourseData?.modules.map((module, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{module.title}</AccordionTrigger>
                <AccordionContent>{module.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="mb-20">
          <h2 className="mb-8 text-center text-3xl font-semibold">Meet Your Instructor</h2>
          <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-8">
            <Avatar className="h-32 w-32">
              <AvatarImage src="https://avatars.githubusercontent.com/u/107530887?v=4" alt="Instructor" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="mb-2 text-2xl font-semibold">Suraj Jha</h3>
              <p className="mb-4 text-muted-foreground">Full-Stack Developer and Instructor</p>
              <p className="mb-4">
                Suraj has been working as a full-stack software engineer as a freelancer for the past three years and
                has completed more than three internships at Indias biggest tech companies while in college. He has
                helped over 4,000 students start their web development journey, and he is still in his 3rd year of
                college.
              </p>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">(4.9/5 based on 2,456 reviews)</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="mb-8 text-center text-3xl font-semibold">What Our Students Say</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Sarah L.",
                role: "Frontend Developer",
                content:
                  "This course was a game-changer for my career. I went from knowing basic HTML to building full-stack applications in just 12 weeks!",
              },
              {
                name: "Michael R.",
                role: "Startup Founder",
                content:
                  "The practical projects and coding challenges in this course prepared me well for real-world development. Highly recommended!",
              },
              {
                name: "Emily T.",
                role: "Software Engineer",
                content:
                  "The instructor's expertise and the comprehensive curriculum make this course stand out. It's intense, but worth every minute and penny.",
              },
            ].map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <p className="mb-4 italic">{testimonial.content}</p>
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${testimonial.name.charAt(0)}`} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="mb-8 text-center text-3xl font-semibold">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {currentCourseData?.frequentlyAskedQuestions.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="rounded-lg dark:bg-[#27272A] bg-[#F3F4F6] p-8 text-center text-zinc-800 dark:text-white">
          <h2 className="mb-4 text-3xl font-semibold">Ready to Start Your Journey?</h2>
          <p className="mb-6 text-lg">Enroll now and take the first step towards becoming a Professional Developer.</p>
          <Button disabled={isPending} onClick={processPayment} size="lg" variant="brand">
            {isPending ? "Processing..." : `Enroll Now for ₹${finalPrice.toFixed(0)}`}
          </Button>
        </section>
      </main>

      <footer className="bg-gray-100 dark:bg-zinc-700 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2024-25 CodeSnippet.dev All rights reserved.</p>
          <p className="mt-2">
            <a href="#" className="underline">
              Privacy Policy
            </a>{" "}
            |{" "}
            <a href="#" className="underline">
              Terms of Service
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}

