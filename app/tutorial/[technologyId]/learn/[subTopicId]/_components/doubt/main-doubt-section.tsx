import React, { useEffect } from "react";
import RichEditorFormContainer from "./editor-form-container";
import Image from "next/image";
import ThreadCard from "./thread-card";

interface Props {
  doubt: {
    id:string;
    content: string;
    likes:[],
    unlikes:[],
    _count:{likes:number},
    isLikedByCurrentUser:boolean,
    isUnLikedByCurrentUser:boolean,
    createdAt: Date;
    user:{
      id:string;
      name:string;
      image:string;
    }
  }[];
  userId: string;
}

const MainDoubtSection = ({ doubt , userId }: Props) => {


  const sampleReplies = [
    {
      avatar: "/path-to-avatar1.jpg",
      username: "JaneSmith",
      content:
        "<p>This is a great question! I think the key point to consider is...</p>",
      likes: 3,
      dislikes: 0,
    },
    {
      avatar: "/path-to-avatar2.jpg",
      username: "BobJohnson",
      content: "<p>I'd like to add that another important factor is...</p>",
      likes: 2,
      dislikes: 1,
    },
  ];
  return (
    <div className="flex flex-col justify-center items-center space-y-2 flex-1 w-full">
      <RichEditorFormContainer />
      <section className="mt-4 flex flex-1 w-full items-start justify-start ">
        <h1 className="  text-2xl  font-bold text-center text-gray-800 dark:text-gray-100 mb-4">
          Doubts
        </h1>
      </section>

{
        doubt.length === 0 && (
          <div className="flex flex-1 w-full flex-col space-y-3 items-center justify-center">
            <Image
              src="/doubt.svg"
              alt="No doubts"
              width={200}
              height={200}
            />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              No doubts yet. Be the first to ask!
            </h2>
          </div>
        ) 
}

      {doubt.map((doubt:any) => {
        

        return(
        <div className="mb-4 w-full flex flex-1 flex-col items-start justify-start" key={doubt.id}>
          <ThreadCard
            avatar={doubt.user.image}
            username={doubt.user.name}
            question={doubt.content}
            likes={doubt._count.likes}
            isLiked={doubt.isLikedByCurrentUser}
            isDisLiked={doubt.isUnLikedByCurrentUser}
            userId={userId}
            doubtId={doubt.id}
            replies={sampleReplies}
          />
        </div>)
})}
    </div>
  );
};

export default MainDoubtSection;
