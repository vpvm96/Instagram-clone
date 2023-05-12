import Link from "next/link"
import Avatar from "./Avatar"

interface Props {
  image: string
  username: string
}

export default function PostUserAvatar({ image, username }: Props) {
  return (
    <div className="flex items-center p-2">
      <Link href={`/user/${username}`} aria-label={username}>
        <Avatar image={image} size="medium" highlight />
      </Link>
      <span className="text-gray-900 font-bold ml-2">{username}</span>
    </div>
  )
}
