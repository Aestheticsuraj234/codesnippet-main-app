'use client'

import React from 'react'
import { Check, Info } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const upcomingFeatures = [
  // Upcoming AI-Powered Features
  {
    name: 'AI-Powered Reverse Engineering & Project Rebuilding',
    description:
      'Paste a GitHub repo, and AI will analyze the architecture, explain the logic, and help you rebuild it step-by-step.',
      comingsoon:true
  },
  {
    name: 'AI-Powered Bug Hunt (Gamified Debugging Challenges)',
    description:
      'AI injects real-world coding bugs into projects. Find and fix them to rank on the leaderboard!',
      comingsoon:true
  },
  {
    name: 'AI-Powered DSA Visualization & Problem-Solving',
    description:
      'Learn Data Structures & Algorithms with real-time visual animations, AI-powered explanations, and problem-solving challenges.',
      comingsoon:true
  },
  {
    name: 'AI-Based Personalized Learning Path',
    description:
      'AI creates a customized learning plan based on your skills, goals, and progress, guiding you through tutorials and projects.',
      comingsoon:true
  },
]

// @ts-ignore
function FeatureRow({ feature, index }) {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <td className="py-4 px-4">
        <div className="font-medium text-white">{feature.name}</div>
        <div className="text-sm text-zinc-400">{feature.description}</div>
      </td>
      <td className="py-4 px-4">
        <Check className="h-6 w-6 text-[#08BD80]" />
      </td>
      <td className="py-4 px-4">
        {feature.comingSoon ? (
          <Badge variant="outline" className="text-[#08BD80] border-[#08BD80]">
            Coming Soon
          </Badge>
        ) : (
          <Badge variant="outline" className="text-zinc-500 border-zinc-500">
            Development
          </Badge>
        )}
      </td>
    </motion.tr>
  )
}

export default function UpcomingV2Features() {
  return (
    <Card className="w-full max-w-4xl mx-auto bg-zinc-900 border-zinc-800">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold text-white">Upcoming V2 Features</CardTitle>
            <CardDescription className="text-zinc-400">
              Exciting new capabilities coming to CortexAI
            </CardDescription>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Info className="h-4 w-4" />
                  <span className="sr-only">Feature information</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Features are subject to change and may be released incrementally</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="py-4 px-4 text-left text-sm font-medium text-zinc-400">Feature</th>
                <th className="py-4 px-4 text-left text-sm font-medium text-zinc-400">Included in V2</th>
                <th className="py-4 px-4 text-left text-sm font-medium text-zinc-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {upcomingFeatures.map((feature, index) => (
                <FeatureRow key={feature.name} feature={feature} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
