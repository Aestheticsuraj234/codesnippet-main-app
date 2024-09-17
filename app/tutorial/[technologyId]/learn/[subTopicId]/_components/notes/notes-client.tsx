import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { memo } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ContentClient from "../content/content-client";
import EditorClient from "./editor-client";

interface NotesClientProps {
  content: {
    content: string;
  };
  video: {
    title: string;
    videoLink: string | null;
    videoDescription: string | null;
    createdAt: Date;
  };
 
  notes:any
}

const NotesClient = ({ content, video, notes }: NotesClientProps) => {
  // Function to extract the video ID from various YouTube URL formats
  const extractVideoId = (link: string | null) => {
    if (!link) return null;
    const videoIdMatch = link.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
    );
    return videoIdMatch ? videoIdMatch[1] : null;
  };

  const videoId = extractVideoId(video.videoLink); // Extract video ID from the link

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full w-full rounded-lg border"
      >
        <ResizablePanel defaultSize={50} className="h-full w-full">
          <Card className="h-full w-full overflow-hidden ">
            <CardContent className="h-full p-6">
              <ScrollArea className="h-full">
                <EditorClient data={notes} />
              </ScrollArea>
            </CardContent>
          </Card>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50} className="h-full w-full">
          <ResizablePanelGroup direction="vertical" className="h-full w-full">
            <ResizablePanel
              defaultSize={25}
              className="h-full w-full flex justify-center items-center p-6"
            >
              <div className="mb-4 flex-grow-0">
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={75} className="h-full w-full p-6">
              <ScrollArea className="h-full w-full">
                <ContentClient data={content} />
              </ScrollArea>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default memo(NotesClient);
