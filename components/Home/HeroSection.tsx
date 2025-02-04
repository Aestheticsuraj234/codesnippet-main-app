import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { TechIcons } from "../3d/tech-icons"
import { TypewriterEffectSmooth } from "../ui/typewriter-effect"
import Link from "next/link"
import { Button } from "../ui/button"
import { ArrowRightIcon } from "lucide-react"
import { useGLTF, OrbitControls, PerspectiveCamera } from "@react-three/drei"

function FlameModel() {
  const { scene } = useGLTF("/flame-2.gltf")
  return <primitive object={scene} scale={0.3} position={[0.4, -0.1, 0]}  /> // Move flame upwards
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
    <div className="h-screen py-24 w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex flex-col lg:flex-row items-center justify-between overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-[#08bd80] opacity-30 blur-3xl rounded-md"></div>
      <div className="absolute top-16 right-0 w-1/3 h-1/3 bg-[#08bd80] opacity-30 blur-3xl rounded-md bottom-9"></div>
      {/* Left side content */}
      <div className="flex flex-col items-start gap-y-4 text-left z-10 mx-8 w-full lg:w-1/2 p-6 lg:p-8">
        <div className="mb-4">
          <TypewriterEffectSmooth words={words} />
        </div>
        <h2 className="font-bold text-[#6B7280] dark:text-[#A1A1AA] text-xl lg:text-3xl tracking-light">
          Your Complete Learning Platform!
        </h2>
        <p className="text-lg font-semibold opacity-80 leading-relaxed text-[#667285] dark:text-[#85858b] mt-2 text-start max-w-full lg:max-w-xl">
          Explore Live-Courses, Organized Tutorials, Weekly Workshops, Explore Blog, Master CS Concepts, Design Systems,
          Sharpen Your Skills, and Ace Interviews with Confidence.
        </p>
        <Link href="/dashboard" className="mt-6 ">
          <Button
            variant={"brand"}
            size={"lg"}
            className="flex items-center justify-center gap-3 font-bold text-md cursor-pointer"
          >
            Get Started <ArrowRightIcon className="w-6 h-6" />
          </Button>
        </Link>
      </div>

      {/* Right side 3D content */}

      <div className="w-full lg:w-1/2 flex items-center justify-center absolute top-5 right-0 bottom-10">
        <Canvas className="">
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={70}  />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            <group scale={[1, 1, 1]} position={[0, 0, 0]}  >
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
