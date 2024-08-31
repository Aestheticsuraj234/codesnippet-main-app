'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ThumbsUp, ThumbsDown, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react'
import CustomRichTextEditor from '@/components/Global/custom-richtext-editor'
import { toggleLike, toggleUnlike } from '@/action/tutorial/learn/doubt'

interface ReplyProps {
  avatar: string
  username: string
  content: string
  likes: number
  dislikes: number
}

const Reply: React.FC<ReplyProps> = ({ avatar, username, content, likes, dislikes }) => {
  return (
    <div className="flex items-start space-x-4 mt-4">
      <Avatar className="w-8 h-8">
        <AvatarImage src={avatar} alt={username} />
        <AvatarFallback>{username[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h4 className="font-semibold text-sm">{username}</h4>
        <div className="mt-1 text-sm" dangerouslySetInnerHTML={{ __html: content }} />
        <div className="flex space-x-2 mt-2">
          <Button variant="ghost" size="sm">
            <ThumbsUp className="mr-1 h-3 w-3" />
            {likes}
          </Button>
          <Button variant="ghost" size="sm">
            <ThumbsDown className="mr-1 h-3 w-3" />
            {dislikes}
          </Button>
        </div>
      </div>
    </div>
  )
}

interface ThreadCardProps {
  avatar: string
  username: string
  question: string
  likes: number
  replies: ReplyProps[]
  userId: string
  doubtId: string
  isLiked: boolean
  isDisLiked: boolean
}

const ThreadCard: React.FC<ThreadCardProps> = ({isDisLiked , avatar, username, question, likes,  replies, userId, doubtId, isLiked }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isReplying, setIsReplying] = useState(false)
  const [isLike, setIsLiked] = useState(isLiked)
  const [isDisLike, setIsDisLiked] = useState(isDisLiked)
  const [replyContent, setReplyContent] = useState('')
  const [threadReplies, setThreadReplies] = useState(replies)
  const [isLikingInProgress, setIsLikingInProgress] = useState(false)
  const [isDisLikingInProgress, setIsDisLikingInProgress] = useState(false)


  useEffect(() => {
    setIsLiked(isLiked)
    setIsDisLiked(isDisLiked)
  },[
    isLiked,
    isDisLiked
  ])

  const handleLike = async () => {
    if (isLikingInProgress) return // Prevent toggling while in progress
    const newLikeStatus = !isLike
    setIsLikingInProgress(true)
    setIsLiked(newLikeStatus)

    try {
      await toggleLike(userId, newLikeStatus, doubtId)
    } catch (error) {
      console.error("Failed to like:", error)
      setIsLiked(!newLikeStatus) // Revert like state on error
    } finally {
      setIsLikingInProgress(false)
    }
  }

  const handleDislike = async () => {
    if(isDisLikingInProgress) return;

    const newDisLikeStatus = !isDisLike;
    setIsDisLikingInProgress(true);
    setIsDisLiked(newDisLikeStatus);

    try {
      await toggleUnlike(userId, newDisLikeStatus, doubtId)
    } catch (error) {
      console.error("Failed to dislike:", error)
      setIsDisLiked(!newDisLikeStatus)
    } finally {
      setIsDisLikingInProgress(false)
    }

  }

  const handleReply = () => {
    setIsReplying(!isReplying)
  }

  const handleSubmitReply = () => {
    if (replyContent.trim()) {
      const newReply: ReplyProps = {
        avatar: '/path-to-default-avatar.jpg', // Replace with actual user avatar
        username: 'Current User', // Replace with actual username
        content: replyContent,
        likes: 0,
        dislikes: 0,
      }
      setThreadReplies([...threadReplies, newReply])
      setIsReplying(false)
      setReplyContent('')
    }
  }

  return (
    <Card className="w-full mx-auto mb-10 mt-4">
      <CardContent className="pt-6">
        <div className="flex items-start space-x-4">
          <Avatar>
            <AvatarImage src={avatar} alt={username} />
            <AvatarFallback>{username[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold">{username}</h3>
            <div className={`mt-2 ${isExpanded ? '' : 'line-clamp-3'}`}>
              <div dangerouslySetInnerHTML={{ __html: question }} />
            </div>
            {question.length > 150 && (
              <Button
                variant="link"
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 p-0 h-auto font-semibold"
              >
                {isExpanded ? (
                  <>
                    Show less <ChevronUp className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Read more <ChevronDown className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" onClick={handleLike} disabled={isLikingInProgress}>
            {isLike ? <ThumbsUp className="mr-2 h-4 w-4 text-green-500" /> : <ThumbsUp className="mr-2 h-4 w-4" />}
            {likes}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleDislike}>
            {
              isDisLike ? <ThumbsDown className="mr-2 h-4 w-4 text-red-500" /> :
                <ThumbsDown className="mr-2 h-4 w-4" />
            }
          </Button>
        </div>
        <Button variant="outline" size="sm" onClick={handleReply}>
          <MessageCircle className="mr-2 h-4 w-4" />
          Reply
        </Button>
      </CardFooter>
      {isReplying && (
        <CardContent className="pt-4">
          <CustomRichTextEditor
            onChange={setReplyContent}
            value={replyContent}
          />
          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsReplying(false)}>Cancel</Button>
            <Button onClick={handleSubmitReply}>Submit Reply</Button>
          </div>
        </CardContent>
      )}
      {threadReplies.length > 0 && (
        <CardContent className="pt-4">
          <Separator className="my-4" />
          <h4 className="font-semibold mb-2">Replies</h4>
          {threadReplies.map((reply, index) => (
            <Reply key={index} {...reply} />
          ))}
        </CardContent>
      )}
    </Card>
  )
}

export default ThreadCard
