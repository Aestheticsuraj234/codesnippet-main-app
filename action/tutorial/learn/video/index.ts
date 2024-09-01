"use server";
import { db } from "@/lib/db/db";
import { revalidatePath } from "next/cache";


export const getVideoBySubTopicId = async (subTopicId: string) => {

    const video = await db.subTopic.findUnique({
        where:{
            id:subTopicId
        },
        select:{
            title:true,
            videoLink:true,
            videoDescription:true,
            createdAt:true,
        }
    })

    revalidatePath(`/tutorial`)
    return video;

}



async function getVideoDuration(videoId:string) {
    const apiKey = process.env.GOOGLE_API_KEY; // Replace with your YouTube Data API key
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${apiKey}`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      if (data.items && data.items.length > 0) {
        const duration = data.items[0].contentDetails.duration;
        return formatDuration(duration); // Format the ISO 8601 duration into a readable format
      } else {
        throw new Error('Video not found or API error');
      }
    } catch (error) {
      console.error('Error fetching video duration:', error);
      return null;
    }
  }
  
  // Helper function to format ISO 8601 duration into readable format (e.g., "34 Mins 12 Secs")
  function formatDuration(duration:any) {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = match[1] ? match[1].replace('H', '') : '0';
    const minutes = match[2] ? match[2].replace('M', '') : '0';
    const seconds = match[3] ? match[3].replace('S', '') : '0';
    return `${hours !== '0' ? hours + ' Hours ' : ''}${minutes !== '0' ? minutes + ' Mins ' : ''}${seconds !== '0' ? seconds + ' Secs' : ''}`.trim();
  }

  export { getVideoDuration }