import { ReactNode } from "react"
import {
  BookmarkFillIcon,
  BookmarkIcon,
  HeartFillIcon,
  HeartIcon,
} from "./ui/icons"
import { useMe, usePosts } from "@/hooks"
import { parseDate } from "@/utils/date"
import { Comment, SimplePost } from "@/model/post"
import ToggleButton from "./ui/ToggleButton"
import CommentForm from "./CommentForm"

interface Props {
  post: SimplePost
  onComment: (comment: Comment) => void
  children?: ReactNode
}

export default function ActionBar({ post, onComment, children }: Props) {
  const { id, likes, createdAt } = post
  const { user, setBookmark } = useMe()
  const { setLike } = usePosts()

  const liked = user ? likes.includes(user.username) : false
  const bookmarked = user?.bookmarks.includes(id) ?? false

  // 좋아요 버튼을 누르면 좋아요를 추가하고, 좋아요를 취소하면 좋아요를 제거합니다.
  const handleLike = (like: boolean) => {
    user && setLike(post, user.username, like)
  }

  // 북마크 버튼을 누르면 북마크를 추가하고, 북마크를 취소하면 북마크를 제거합니다.
  const handleBookmark = (bookmark: boolean) => {
    user && setBookmark(id, bookmark)
  }

  const handleComment = (comment: string) => {
    user && onComment({ comment, username: user.username, image: user.image })
  }

  return (
    <>
      <div className="flex justify-between my-1 p-4">
        <ToggleButton
          toggled={liked}
          onToggle={handleLike}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />
        <ToggleButton
          toggled={bookmarked}
          onToggle={handleBookmark}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>
      <div className="px-4 py-1">
        <p className="text-sm font-bold mb-2">{`${likes?.length ?? 0} ${
          likes?.length > 1 ? "likes" : "like"
        }`}</p>
        {children}
        <p className="text-xs text-neutral-500 uppercase my-2">
          {parseDate(createdAt)}
        </p>
      </div>
      <CommentForm onPostComment={handleComment} />
    </>
  )
}
