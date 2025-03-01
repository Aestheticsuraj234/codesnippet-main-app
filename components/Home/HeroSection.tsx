import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { TechIcons } from "../3d/tech-icons"
import { TypewriterEffectSmooth } from "../ui/typewriter-effect"
import Link from "next/link"
import { Button } from "../ui/button"
import { ArrowRightIcon } from "lucide-react"
import { useGLTF, OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { useThree } from "@react-three/fiber"

function FlameModel() {
  const { viewport } = useThree()
  const isMobile = viewport.width < 768
  const isLargeScreen = viewport.width > 1440

  // Dynamic scale factor for flame
  const scaleFactor = isMobile
    ? 0.4 // Larger on mobile
    : isLargeScreen
    ? 0.2 // Smaller on very large screens
    : 0.3 // Default scale for medium screens

  const { scene } = useGLTF("/flame-2.gltf")
  return (
    <primitive
      object={scene}
      scale={scaleFactor}
      position={[0.4, isMobile ? 0.5 : -0.1, 0]}
    />
  )
}

function ResponsiveCamera() {
  const { viewport } = useThree()
  const isMobile = viewport.width < 768
  const isLargeScreen = viewport.width > 1440

  return (
    <PerspectiveCamera
      makeDefault
      position={[0, 0, isMobile ? 4 : isLargeScreen ? 7 : 5]}
      fov={isMobile ? 80 : isLargeScreen ? 60 : 70}
    />
  )
}

const HeroSection = () => {
  const words = [
    { text: "Welcome " },
    { text: "to" },
    {
      text: "Codesnippet.",
      className: "text-emerald-500 dark:text-emerald-500",
    },
  ]

  return (
    <div className="min-h-screen py-12 md:py-24 w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex flex-col-reverse lg:flex-row items-center justify-between overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-[#08bd80] opacity-30 blur-3xl rounded-md"></div>
      <div className="absolute top-16 right-0 w-1/3 h-1/3 bg-[#08bd80] opacity-30 blur-3xl rounded-md bottom-9"></div>

      {/* Left side content (Text) */}
      <div className="flex flex-col items-start gap-y-4 text-left z-10 mx-4 md:mx-8 w-full lg:w-1/2 p-4 md:p-6 lg:p-8 mt-4 md:mt-12  lg:mt-0">
        <div className="mb-2 md:mb-4">
          <div className="text-4xl md:text-4xl lg:text-5xl">
            <TypewriterEffectSmooth words={words} />
          </div>
        </div>
        <h2 className="font-bold text-[#6B7280] dark:text-[#A1A1AA] text-xl md:text-2xl lg:text-3xl tracking-light">
          Your Complete Learning Platform!
        </h2>
        <p className="text-lg md:text-xl font-semibold opacity-80 leading-relaxed text-[#667285] dark:text-[#85858b] mt-2 text-start max-w-full lg:max-w-xl">
          Explore Live-Courses, Organized Tutorials, Weekly Workshops, Explore Blog, Master CS Concepts, Design Systems,
          Sharpen Your Skills, and Ace Interviews with Confidence.
        </p>
        <Link href="/dashboard" className="mt-4 md:mt-6">
          <Button
            variant={"brand"}
            size={"lg"}
            className="flex items-center justify-center gap-2 md:gap-3 font-bold text-sm md:text-md cursor-pointer"
          >
            Get Started <ArrowRightIcon className="w-4 h-4 md:w-6 md:h-6" />
          </Button>
        </Link>
      </div>

      {/* Right side content (3D Canvas) */}
      <div className="w-full lg:w-1/2 h-[40vh] md:h-[50vh] lg:h-auto flex items-center justify-center relative mt-8 lg:mt-0 lg:absolute lg:top-5 lg:right-0 lg:bottom-10">
        <Canvas className="w-full h-full">
          <ResponsiveCamera />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            <group>
              <TechIcons />
              <FlameModel />
            </group>
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>
    </div>
  )
}

export default HeroSection