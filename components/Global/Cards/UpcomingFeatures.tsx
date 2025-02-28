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
  {
    name: 'AI-Powered Code Review',
    description: 'Get instant feedback on your code quality and suggestions for improvements',
    comingSoon: true,
  },
  {
    name: 'Advanced Project Management',
    description: 'Integrated tools for task tracking, timelines, and team collaboration',
    comingSoon: true,
  },
  {
    name: 'Code Snippets Marketplace',
    description: 'Share and discover reusable code snippets from the community',
    comingSoon: false,
  },
  {
    name: 'Multi-Language Support',
    description: 'Expand your coding capabilities with support for additional programming languages',
    comingSoon: true,
  },
  {
    name: 'Interactive Coding Tutorials',
    description: 'Learn new concepts with hands-on, interactive coding lessons',
    comingSoon: false,
  },
  {
    name: 'Advanced Performance Profiling',
    description: 'Identify and optimize performance bottlenecks in your code',
    comingSoon: true,
  },
  {
    name: 'Customizable Workflow Automation',
    description: 'Create and share automated workflows to streamline your development process',
    comingSoon: false,
  },
  {
    name: 'Integrated CI/CD Pipeline',
    description: 'Seamlessly deploy your projects with built-in continuous integration and delivery',
    comingSoon: true,
  },
]

function FeatureRow({ feature, index }: { feature: typeof upcomingFeatures[0], index: number }) {
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
              Exciting new capabilities coming to Sigma-Coders
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