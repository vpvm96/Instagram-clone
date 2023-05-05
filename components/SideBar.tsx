import { User } from "@/model/user"
import Avatar from "./Avatar"

interface Props {
  user: User
}

export default function SideBar({ user: { name, email, image } }: Props) {
  return (
    <>
      <div className="flex items-center">
        {image && <Avatar image={image} size="normal" />}
        <div className="ml-4">
          <p className="font-bold">{email.split("@")[0]}</p>
          <p className="text-lg text-neutral-500 leading-4">{name}</p>
        </div>
      </div>
      <p className="text-sm text-neutral-500 mt-8">
        About · Help · Press · API · Jobs · Privacy · Terms · Locations · Top
        Accounts · Hashtags · Language
      </p>
      <p className="font-bold text-sm mt-8 text-neutral-500">
        @Copyright INSTAGRAM from META
      </p>
    </>
  )
}