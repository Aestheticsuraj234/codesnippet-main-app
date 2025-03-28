"use client"
import { IconBrandLinkedin, IconBrandTwitter, IconBrandGithub } from "@tabler/icons-react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Cover } from "../ui/cover"

type Founder = {
  quote: string
  name: string
  designation: string
  src: string
  socialLinks: {
    linkedin?: string
    twitter?: string
    github?: string
  }
  skills: string[]
}

export const FoundersGrid = ({
  founders,
}: {
  founders: Founder[]
}) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  }

  return (
    <section
      id="founders"
      className="min-h-screen w-full py-16 sm:py-20 md:py-24 dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex flex-col items-center justify-center"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none"></div>

      {/* Title */}
      <h2 className="text-center font-extrabold text-2xl md:text-4xl lg:text-6xl px-4 py-4 mb-8 sm:mb-12">
        Meet Our <Cover>Founders</Cover>
      </h2>

      {/* Founders Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
        // @ts-ignore
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {founders.map((founder, index) => (
            <motion.div
              key={founder.name}
              // @ts-ignore
              className="bg-white/5 backdrop-blur-sm dark:bg-black/20 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full"
              variants={itemVariants}
            >
              {/* Founder Image */}
              {/* @ts-ignore */}
              <motion.div className="relative h-80 w-full overflow-hidden" variants={imageVariants} whileHover="hover">
                <Image
                  src={founder.src || "/placeholder.svg"}
                  alt={founder.name}
                  width={500}
                  height={500}
                  className="h-full w-full  object-scale-down"
                />
              </motion.div>

              {/* Founder Info */}
              <div className="p-6 flex-1 flex flex-col">
                <div>
                  <h3 className="text-xl font-bold dark:text-white text-black">{founder.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-neutral-400">{founder.designation}</p>
                </div>

                {/* Quote - truncated for card view */}
                <p className="text-sm text-gray-600 dark:text-neutral-300 mt-4 line-clamp-3">{founder.quote}</p>

                {/* Skills */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {founder.skills.slice(0, 3).map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-neutral-300 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {founder.skills.length > 3 && (
                    <span className="bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-neutral-300 px-2 py-1 rounded-full text-xs font-medium">
                      +{founder.skills.length - 3}
                    </span>
                  )}
                </div>

                {/* Social Links */}
                <div className="flex gap-4 mt-auto pt-4">
                  {founder.socialLinks.linkedin && (
                    <a
                      href={founder.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-[#08BD80] transition-colors"
                      aria-label={`${founder.name}'s LinkedIn`}
                    >
                      <IconBrandLinkedin className="h-5 w-5" />
                    </a>
                  )}
                  {founder.socialLinks.twitter && (
                    <a
                      href={founder.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-[#08BD80] transition-colors"
                      aria-label={`${founder.name}'s Twitter`}
                    >
                      <IconBrandTwitter className="h-5 w-5" />
                    </a>
                  )}
                  {founder.socialLinks.github && (
                    <a
                      href={founder.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-[#08BD80] transition-colors"
                      aria-label={`${founder.name}'s GitHub`}
                    >
                      <IconBrandGithub className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

