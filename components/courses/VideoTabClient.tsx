import React from 'react'
import { Card, CardContent } from '../ui/card';

interface VideoTabClientProps {
    videoLink:string | null
}

const VideoTabClient = ({videoLink}:VideoTabClientProps) => {

      // Function to extract the video ID from various YouTube URL formats
  const extractVideoId = (link: string | null) => {
    if (!link) return null;
    const videoIdMatch = link.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
    return videoIdMatch ? videoIdMatch[1] : null;
  };

  const videoId = extractVideoId(videoLink); // Extract video ID from the link

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
      </div>
    </div>
  )
}

export default VideoTabClient