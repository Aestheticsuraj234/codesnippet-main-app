"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, ChevronRight, Clock, Code, type LucideIcon } from 'lucide-react'
import { cn } from "@/lib/utils"

type TopicContent = {
  title: string;
  topics: string[];
}

type ModuleContent = string[] | TopicContent[];

interface Module {
  title: string;
  content: ModuleContent;
}

interface CourseModulesProps {
  modules: Module[];
}

export default function CourseModules({ modules }: CourseModulesProps) {
  const [activeModule, setActiveModule] = useState(0);
  const [expandedModules, setExpandedModules] = useState<number[]>([]);

  const toggleExpandModule = (index: number) => {
    setExpandedModules(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  const isContentArray = (content: any): content is string[] => {
    return Array.isArray(content) && (content.length === 0 || typeof content[0] === 'string');
  };

  const isTopicArray = (content: any): content is TopicContent[] => {
    return Array.isArray(content) && (content.length === 0 || (typeof content[0] === 'object' && 'title' in content[0]));
  };

  const renderContent = (content: ModuleContent) => {
    if (isContentArray(content)) {
      return (
        <ul className="space-y-3 pl-2">
          {content.map((item, idx) => (
            <li key={idx} className="flex items-start">
              <CheckCircle className="h-5 w-5 mr-3 text-green-500 flex-shrink-0" />
              <span className="text-sm md:text-base">{item}</span>
            </li>
          ))}
        </ul>
      );
    } else if (isTopicArray(content)) {
      return (
        <div className="space-y-6">
          {content.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="text-lg font-medium text-primary">{section.title}</h4>
              <ul className="space-y-3 pl-2">
                {section.topics.map((topic, topicIdx) => (
                  <li key={topicIdx} className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 text-green-500 flex-shrink-0" />
                    <span className="text-sm md:text-base">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // Extract days from module title if available
  const getDaysFromTitle = (title: string) => {
    const dayMatch = title.match(/Day\s+(\d+)\s+to\s+Day\s+(\d+)/i);
    if (dayMatch) {
      return `${dayMatch[1]}-${dayMatch[2]}`;
    }
    return null;
  };

  // Count total topics in a module
  const countTopics = (content: ModuleContent): number => {
    if (isContentArray(content)) {
      return content.length;
    } else if (isTopicArray(content)) {
      return content.reduce((acc, section) => acc + section.topics.length, 0);
    }
    return 0;
  };

  return (
    <section className="mb-20">
      <h2 className="mb-8 text-center text-3xl font-semibold">Course Curriculum</h2>

      {/* Mobile view */}
      <div className="md:hidden">
        <Accordion type="multiple" className="w-full">
          {modules.map((module, index) => {
            const days = getDaysFromTitle(module.title);
            const topicCount = countTopics(module.content);
            
            return (
              <AccordionItem key={index} value={`module-${index}`} className="border rounded-lg mb-4 overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:bg-muted/50 bg-muted/20">
                  <div className="flex items-start text-left">
                    <Badge variant="outline" className="mr-3 mt-1 shrink-0">
                      {index + 1}
                    </Badge>
                    <div>
                      <h3 className="font-medium text-base">{module.title}</h3>
                      <div className="flex items-center mt-1 text-xs text-muted-foreground">
                        {days && (
                          <span className="flex items-center mr-3">
                            <Clock className="h-3 w-3 mr-1" />
                            Days {days}
                          </span>
                        )}
                        <span>{topicCount} topics</span>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 py-3">
                  {renderContent(module.content)}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      {/* Desktop view */}
      <div className="hidden md:grid md:grid-cols-12 gap-6">
        {/* Module navigation sidebar */}
        <div className="col-span-4 lg:col-span-3">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Course Modules</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col">
                {modules.map((module, index) => {
                  const days = getDaysFromTitle(module.title);
                  const topicCount = countTopics(module.content);
                  
                  return (
                    <button
                      key={index}
                      onClick={() => setActiveModule(index)}
                      className={cn(
                        "flex items-start p-4 text-left border-b transition-colors hover:bg-muted/50",
                        activeModule === index ? "bg-muted" : ""
                      )}
                    >
                      <Badge variant="outline" className="mr-3 mt-1 shrink-0">
                        {index + 1}
                      </Badge>
                      <div className="flex-grow">
                        <p className={cn(
                          "font-medium",
                          activeModule === index ? "text-primary" : ""
                        )}>
                          {module.title.split(':')[0]}
                        </p>
                        <div className="flex items-center mt-1 text-xs text-muted-foreground">
                          {days && (
                            <span className="flex items-center mr-3">
                              <Clock className="h-3 w-3 mr-1" />
                              Days {days}
                            </span>
                          )}
                          <span>{topicCount} topics</span>
                        </div>
                      </div>
                      <ChevronRight className={cn(
                        "h-5 w-5 ml-2 self-center transition-transform",
                        activeModule === index ? "rotate-90 text-primary" : ""
                      )} />
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Module content */}
        <div className="col-span-8 lg:col-span-9">
          <Card className="h-full">
            <CardHeader className="border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <Code className="h-5 w-5 mr-2 text-primary" />
                  {modules[activeModule].title}
                </CardTitle>
                <Badge variant="secondary" className="ml-2">
                  {countTopics(modules[activeModule].content)} topics
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 overflow-auto max-h-[600px]">
              {renderContent(modules[activeModule].content)}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
