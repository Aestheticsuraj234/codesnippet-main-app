"use client";

import { toggleDone, toggleLike, toggleUnLike, toggleSave } from "@/action/tutorial/learn/content";
import { Button } from "@/components/ui/button";
import { useMenu } from "@/zustand/use-menu";
import { CheckCircle, Heart, ThumbsDown, BookmarkPlus, BookmarkCheck } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

interface ActionMenuProps {
  isMarkAsDone: boolean;
  isLiked: boolean;
  isUnliked: boolean;
  isSaved: boolean;
  likeCount: number;
  userId: string;
  subTopicId: string;
}

const ActionMenu = ({ isMarkAsDone, userId, subTopicId, isLiked, isUnliked, isSaved, likeCount }: ActionMenuProps) => {
  const [isCompleted, setIsCompleted] = useState(isMarkAsDone);
  const [isLike, setIsLiked] = useState(isLiked);
  const [isUnlike, setIsUnliked] = useState(isUnliked);
  const [isSavedState, setIsSaved] = useState(isSaved);


  
  useEffect(() => {
    setIsCompleted(isMarkAsDone);
    setIsLiked(isLiked);
    setIsSaved(isSaved);
  }, [isMarkAsDone , isLiked ,isSaved  ]);

  const onMarkAsDone = async () => {
    const newCompletedStatus = !isCompleted;
    setIsCompleted(newCompletedStatus);

    try {
      await toggleDone(subTopicId, userId, newCompletedStatus);
    } catch (error) {
      console.error("Failed to mark as done:", error);
      setIsCompleted(!newCompletedStatus); // Revert state if error occurs
    }
  };

  const onLike = async () => {
    const newLikeStatus = !isLike;
    setIsLiked(newLikeStatus);

    try {
      await toggleLike(subTopicId, userId, newLikeStatus);
    } catch (error) {
      console.error("Failed to like:", error);
      setIsLiked(!newLikeStatus);
    }
  }

  const onUnlike = async () => {
    const newUnlikeStatus = !isUnlike;
    setIsUnliked(newUnlikeStatus);

    try {
      await toggleUnLike(subTopicId, userId, newUnlikeStatus);
    } catch (error) {
      console.error("Failed to unlike:", error);
      setIsUnliked(!newUnlikeStatus);
    }
  }

  const onSave = async () => {
    const newSaveStatus = !isSavedState;
    setIsSaved(newSaveStatus);

    try {
      await toggleSave(subTopicId, userId, newSaveStatus);
    } catch (error) {
      console.error("Failed to save:", error);
      setIsSaved(!newSaveStatus);
    }
  }

  return (
    <div className="flex items-center mt-4 sm:mt-0 space-x-2">
      <Button
        variant={isCompleted ? "completed" : "outline"}
        size="sm"
        onClick={onMarkAsDone}
        className="flex items-center"
      >
        <CheckCircle className="h-4 w-4 mr-2" />
        {isCompleted ? "Completed" : "Mark as Done"}
      </Button>
      <Button
          variant={isLike ? "default" : "outline"}
          size="sm"
          onClick={onLike}
          aria-label="Like"
          className="flex items-center"
        >
          {isLike ? <FaHeart className="h-4 w-4 text-[#E0115F] mr-2" /> : <Heart className="h-4 w-4 mr-2" />}
          <span className="text-sm">{likeCount}</span>
        </Button>
      {/* TODO: ADD FEEDBACK MODAL LATER */}
      {/* <Button
        variant={isUnlike ? "default" : "outline"}
        size="icon"
        onClick={onUnlike}
        aria-label="Dislike"
      >
        <ThumbsDown className="h-4 w-4" />
      </Button> */}
      <Button
        variant={isSavedState ? "default" : "outline"}
        size="icon"
        onClick={onSave}
        aria-label="Save"
      >
        {isSavedState ? <BookmarkCheck className="h-4 w-4" /> : <BookmarkPlus className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default ActionMenu;