"use client";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import {
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandGithub,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Cover } from "../ui/cover";

type Founder = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  skills: string[];
};

export const AnimatedFounders = ({
  founders,
  autoplay = false,
}: {
  founders: Founder[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % founders.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + founders.length) % founders.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className="h-screen w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex flex-col items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none"></div>
      <h1 className="text-center font-extrabold text-2xl md:text-4xl lg:text-6xl px-4 py-4">
        Meet Our <Cover>Founders</Cover>
      </h1>
      <div className="max-w-sm md:max-w-4xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-20">
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
          {/* Image Section */}
          <div>
            <div className="relative h-80 w-full">
              <AnimatePresence>
                {founders.map((founder, index) => (
                  <motion.div
                    key={founder.src}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      z: -100,
                      rotate: randomRotateY(),
                    }}
                    animate={{
                      opacity: isActive(index) ? 1 : 0.7,
                      scale: isActive(index) ? 1 : 0.95,
                      z: isActive(index) ? 0 : -100,
                      rotate: isActive(index) ? 0 : randomRotateY(),
                      zIndex: isActive(index)
                        ? 999
                        : founders.length + 2 - index,
                      y: isActive(index) ? [0, -80, 0] : 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      z: 100,
                      rotate: randomRotateY(),
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 origin-bottom"
                  >
                    <Image
                      src={founder.src}
                      alt={founder.name}
                      width={500}
                      height={500}
                      draggable={false}
                      className="h-full w-full rounded-3xl object-cover object-center"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex justify-between flex-col py-4">
            <motion.div
              key={active}
              initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -20,
                opacity: 0,
              }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
            >
              <h3 className="text-2xl font-bold dark:text-white text-black">
                {founders[active].name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-neutral-500">
                {founders[active].designation}
              </p>
              <motion.p className="text-lg text-gray-500 mt-8 dark:text-neutral-300">
                {founders[active].quote.split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{
                      filter: "blur(10px)",
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                      delay: 0.02 * index,
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>

              {/* Social Links */}
              <div className="flex gap-4 mt-6">
                {founders[active].socialLinks.linkedin && (
                  <a
                    href={founders[active].socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-500 transition-colors"
                  >
                    <IconBrandLinkedin className="h-6 w-6" />
                  </a>
                )}
                {founders[active].socialLinks.twitter && (
                  <a
                    href={founders[active].socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition-colors"
                  >
                    <IconBrandTwitter className="h-6 w-6" />
                  </a>
                )}
                {founders[active].socialLinks.github && (
                  <a
                    href={founders[active].socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-700 transition-colors"
                  >
                    <IconBrandGithub className="h-6 w-6" />
                  </a>
                )}
              </div>

              {/* Technical Skills */}
              <div className="mt-6 flex flex-wrap gap-2">
                {founders[active].skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-neutral-300 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-12 md:pt-0 mt-4">
              <button
                onClick={handlePrev}
                className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
              >
                <IconArrowLeft className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300" />
              </button>
              <button
                onClick={handleNext}
                className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
              >
                <IconArrowRight className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};