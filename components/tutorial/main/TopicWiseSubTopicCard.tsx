import React from 'react'
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components//ui/button";
import Link from "next/link";
import { CircleCheckBig } from 'lucide-react';

interface TopicWiseSubTopicProps {
    title:string;
    id:string;
    isCompleted:boolean;
    technologyId:string;
}

const TopicWiseSubTopicCard = ({title  , id , isCompleted=true , technologyId}:TopicWiseSubTopicProps) => {

  return (
    <Card className="overflow-hidden px-4 py-4">
    <CardContent className="p-0">
     <div className="flex flex-row items-center justify-between w-full">
            <div className='flex flex-row justify-start items-center gap-2'>
            {
                isCompleted ? <CircleCheckBig className="w-6 h-6 text-green-500" /> : <CircleCheckBig className="w-6 h-6 text-gray-400" />
            }
            <h3 className="text-lg font-semibold">{title}</h3>
            </div>

            <Button variant={"outline"} size="lg">
                {/* TODO: Need to change it later */}
                <Link href={`/tutorial/${technologyId}/learn/${id}`}>
                    Start Learning
                </Link>
            </Button>
     </div>
    </CardContent>
   
  </Card>
  )
}

export default TopicWiseSubTopicCard