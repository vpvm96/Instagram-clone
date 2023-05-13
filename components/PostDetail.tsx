import Link from "next/link"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { usePost } from "@/hooks"
import { SimplePost } from "@/model/post"
import PostUserAvatar from "./PostUserAvatar"
import ActionBar from "./ActionBar"
import Avatar from "./Avatar"
import { CloseIcon } from "./ui/icons"

interface Props {
  post: SimplePost
}

export default function PostDetail({ post }: Props) {
  const { id, userImage, username, image } = post
  const { post: data, postComment } = usePost(id)
  const { data: session } = useSession()

  const comments = data?.comments
  const myComment = comments?.map((comment) => {
    return {
      ...comment,
      isMine: comment.username === session?.user?.username,
    }
  })

  return (
    <section className="flex w-full h-full">
      <div className="relative basis-3/5">
        <Image
          className="object-cover"
          src={image}
          alt={`photo by ${username}`}
          priority
          fill
          sizes="650px"
        />
      </div>
      <div className="w-full basis-2/5 flex flex-col border-l border-l-gray-200">
        <PostUserAvatar image={userImage} username={username} />
        <ul className="border-t border-gray-200 h-full overflow-y-auto p-4 mb-1">
          {myComment &&
            myComment.map(
              (
                { image, username: commentUsername, comment, isMine },
                index
              ) => (
                <li key={index} className="flex items-center mb-1">
                  <Link href={`user/${username}`} aria-label={username}>
                    <Avatar
                      image={image}
                      size="small"
                      highlight={commentUsername === username}
                    />
                  </Link>
                  <div className="ml-2 flex">
                    <span className="font-bold mr-1">{commentUsername}</span>
                    <span>{comment}</span>
                    {isMine && (
                      <button className="ml-2">
                        <CloseIcon />
                      </button>
                    )}
                  </div>
                </li>
              )
            )}
        </ul>
        <ActionBar post={post} onComment={postComment} />
      </div>
    </section>
  )
}
