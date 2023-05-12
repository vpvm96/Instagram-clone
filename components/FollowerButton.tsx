"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { useMe } from "@/hooks"
import { PulseLoader } from "react-spinners"
import { ProfileUser } from "@/model/user"
import Button from "./ui/Button"

interface Props {
  user: ProfileUser
}

export default function FollowerButton({ user }: Props) {
  const { username } = user
  const { user: loggedInUser, toggleFollow } = useMe()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const isUpdating = isPending || isFetching

  const showButton = loggedInUser && loggedInUser?.username !== username
  const following =
    loggedInUser &&
    loggedInUser?.following.find((item) => item.username === username)
  const text = following ? "Unfollow" : "Follow"

  const handleFollow = async () => {
    setIsFetching(true)
    await toggleFollow(user.id, !following)
    setIsFetching(false)
    startTransition(() => router.refresh())
  }

  return (
    <>
      {showButton && (
        <div className="relative">
          {isUpdating && (
            <div className="absolute z-20 inset-0 flex justify-center items-center">
              <PulseLoader size={6} />
            </div>
          )}
          <Button
            disabled={isUpdating}
            text={text}
            onClick={handleFollow}
            red={text === "Unfollow"}
          />
        </div>
      )}
    </>
  )
}
