import { Metadata } from "next"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import NewPost from "@/components/NewPost"

export const metadata: Metadata = {
  title: "New Post",
  description: "Create a new post",
}

export default async function NewPostPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect("/auth/signin")

  return <NewPost user={session.user} />
}
