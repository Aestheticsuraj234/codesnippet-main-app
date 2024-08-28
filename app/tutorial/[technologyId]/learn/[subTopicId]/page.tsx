import Image from 'next/image'
import React from 'react'
import { Poppins } from 'next/font/google'
import { ContentLayout } from '@/components/tutorial/content-layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {  FileText, HelpCircle,   Notebook,   Video } from 'lucide-react';
import { cn } from '@/lib/utils';


const poppins = Poppins({ subsets: ["latin"] , weight: ["400", "500", "600", "700"] });

const LearnMainPage = ({params}:{params:{technologyId:string , subTopicId:string}}) => {
  return (
   <ContentLayout>
       <section className={cn("w-auto" , poppins.className)}>
       <Tabs defaultValue="content" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger 
          value="content" 
          className="flex items-center justify-center gap-2 data-[state=active]:text-yellow-500 data-[state=active]:font-bold dark:data-[state=active]:bg-[#212121]  "
        >
          <FileText size={20} className=" group-data-[state=active]:text-yellow-500" />
          <span className="hidden sm:inline">Content</span>
        </TabsTrigger>
        <TabsTrigger 
          value="video" 
          className="flex items-center justify-center gap-2 data-[state=active]:text-yellow-500 data-[state=active]:font-bold dark:data-[state=active]:bg-[#212121] "
        >
          <Video size={20} className=" group-data-[state=active]:text-yellow-500" />
          <span className="hidden sm:inline ">Video</span>
        </TabsTrigger>
        <TabsTrigger 
          value="doubt" 
          className="flex items-center justify-center gap-2 data-[state=active]:text-yellow-500 data-[state=active]:font-bold dark:data-[state=active]:bg-[#212121] "
        >
          <HelpCircle size={20} className=" group-data-[state=active]:text-yellow-500" />
          <span className="hidden sm:inline">Doubt</span>
        </TabsTrigger>
        <TabsTrigger 
          value="notes" 
          className="flex items-center justify-center gap-2 data-[state=active]:text-yellow-500 data-[state=active]:font-bold dark:data-[state=active]:bg-[#212121] "
        >
          <Notebook size={20} className=" group-data-[state=active]:text-yellow-500" />
          <span className="hidden sm:inline">Notes</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="content" className="mt-4">
        <div className="rounded-lg border p-6">
          <h2 className="text-2xl font-bold mb-4">Content</h2>
          <p>This is where the main content would go. It could include text, images, and other media related to the topic.</p>
        </div>
      </TabsContent>
      <TabsContent value="video" className="mt-4">
        <div className="rounded-lg border p-6">
          <h2 className="text-2xl font-bold mb-4">Video</h2>
          <p>Here you would embed a video player or provide links to relevant video content.</p>
        </div>
      </TabsContent>
      <TabsContent value="doubt" className="mt-4">
        <div className="rounded-lg border p-6">
          <h2 className="text-2xl font-bold mb-4">Doubt</h2>
          <p>This section could contain FAQs, a form to submit questions, or a discussion forum for addressing doubts.</p>
        </div>
      </TabsContent>
      <TabsContent value="notes" className="mt-4">
        <div className="rounded-lg border p-6">
          <h2 className="text-2xl font-bold mb-4">Notes</h2>
          <p>Here users could find a note-taking interface or a summary of key points from the content.</p>
        </div>
      </TabsContent>
    </Tabs>
    </section>
   </ContentLayout>

  )
}

export default LearnMainPage