"use client"

import { useState } from "react"
import Image from "next/image"
import { usePosts } from "@/hooks"
import { Comment, SimplePost } from "@/model/post"
import ActionBar from "./ActionBar"
import CommentForm from "./CommentForm"
import ModalPortal from "./ui/ModalPortal"
import PostModal from "./PostModal"
import PostDetail from "./PostDetail"
import PostUserAvatar from "./PostUserAvatar"

interface Props {
  post: SimplePost
  priority?: boolean
}

export default function PostListCard({ post, priority = false }: Props) {
  const { userImage, username, image, text, comments } = post
  const [openModal, setOpenModal] = useState(false)
  const { postComment } = usePosts()

  // 댓글을 작성하면 댓글을 추가합니다.
  const handlePostComment = (comment: Comment) => {
    postComment(post, comment)
  }

  return (
    <article className="rounded-lg shadow-md border border-gray-200">
      <PostUserAvatar image={userImage} username={username} />
      <Image
        className="w-full object-cover aspect-square"
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
        draggable={false}
        priority={priority}
        onClick={() => setOpenModal(true)}
      />
      <ActionBar post={post} onComment={handlePostComment}>
        <p>
          <span className="font-bold mr-1">{username}</span>
          {text}
        </p>
        {comments > 1 && (
          <button
            className="font-bold my-2 text-sky-500"
            onClick={() => setOpenModal(true)}
          >{`View all ${comments} comments`}</button>
        )}
      </ActionBar>
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </article>
  )
}
