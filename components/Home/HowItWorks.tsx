"use client"

import { useRef, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { VideoBackground } from "../video-background"
import { VideoPlayer } from "../video-player"
import { Cover } from "../ui/cover"


gsap.registerPlugin(ScrollTrigger)

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const videoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    const video = videoRef.current

    if (section && title && video) {
      gsap.fromTo(
        title,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
          },
        },
      )

      gsap.fromTo(
        video,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            end: "top 30%",
            scrub: true,
          },
        },
      )
    }
  }, [])

  return (
    <section 
      ref={sectionRef} 
      id="howitworks" 
      className="min-h-screen py-16 md:py-0 w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex flex-col items-center justify-center"
    >
      <div className="absolute inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none"></div>
      <h1 ref={titleRef} className="text-5xl font-bold text-[#1A1818] dark:text-[#ffffff] text-center mb-10">
        How It <Cover>Works</Cover>
      </h1>
      <div ref={videoRef} className="w-full max-w-4xl mx-auto relative">
        <div className="absolute inset-0 -z-10">
          <Canvas>
            <Environment preset="night" />
            <VideoBackground />
          </Canvas>
        </div>
        <VideoPlayer videoId="4Xh9DLUQCWs" />
      </div>
    </section>
  )
}

