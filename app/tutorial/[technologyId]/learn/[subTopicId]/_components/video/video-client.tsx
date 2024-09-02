import React, { memo } from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface VideoClientProps {
  data: {
    title: string;
    videoLink: string | null;
    videoDescription: string | null;
    createdAt: Date;
  }
}
 async function VideoClient({ data }: VideoClientProps) {
  const tags = [
    "React",
    "JavaScript",
    "Frontend",
    "Web Development",
    "Beginner",
  ];

  // Function to extract the video ID from various YouTube URL formats
  const extractVideoId = (link: string | null) => {
    if (!link) return null;
    const videoIdMatch = link.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
    return videoIdMatch ? videoIdMatch[1] : null;
  };

  const videoId = extractVideoId(data.videoLink); // Extract video ID from the link

//  Get the video duration

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-1">
        <Card className="overflow-hidden">
          <div className="relative pb-[56.25%]">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`} // Use the formatted video link with the extracted ID
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">{data.title}</h2>
           
            <p className={`text-muted-foreground truncate`}>
              {data.videoDescription}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


export default memo(VideoClient);