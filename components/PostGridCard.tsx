"use client"

import { useState } from "react"
import { signIn, useSession } from "next-auth/react"
import { SimplePost } from "@/model/post"
import Image from "next/image"
import ModalPortal from "./ui/ModalPortal"
import PostModal from "./PostModal"
import PostDetail from "./PostDetail"

interface Props {
  post: SimplePost
  priority: boolean
}

export default function PostGridCard({ post, priority = false }: Props) {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const { data: session } = useSession()
  const { image, username } = post

  const handleOpenPostModal = () => {
    if (!session?.user) return signIn()
    setOpenModal(true)
  }

  return (
    <div className="relative w-full aspect-square">
      <Image
        className="object-cover"
        src={image}
        alt={`photo by ${username}`}
        fill
        sizes="650px"
        priority={priority}
        onClick={handleOpenPostModal}
      />
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </div>
  )
}
