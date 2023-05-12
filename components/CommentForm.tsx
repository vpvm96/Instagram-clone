import { FormEvent, useState } from "react"
import { SmileIcon } from "./ui/icons"

interface Props {
  onPostComment: (comment: string) => void
}

export default function CommentForm({ onPostComment }: Props) {
  const [comment, setComment] = useState("")
  const buttonDisabled = comment.trim().length === 0

  // 댓글을 입력하고 제출하면 댓글을 게시합니다.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onPostComment(comment)
    setComment("")
  }

  return (
    <form
      className="flex items-center px-3 border-t border-neutral-300"
      onSubmit={handleSubmit}
      action=""
    >
      <SmileIcon />
      <input
        className="w-full ml-2 border-none outline-none p-3"
        type="text"
        placeholder="Add a comment..."
        required
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        disabled={buttonDisabled}
        className={`font-bold ml-2 ${
          buttonDisabled ? "text-sky-300" : "text-sky-500"
        }`}
      >
        Post
      </button>
    </form>
  )
}
