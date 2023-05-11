import { BsBookmarkStar } from "react-icons/bs"

type Props = {
  className?: string
}

export default function BookmarkIcon({ className }: Props) {
  return <BsBookmarkStar className={className || "w-6 h-6"} />
}
