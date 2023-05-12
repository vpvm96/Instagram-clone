import { Metadata } from "next"
import { notFound } from "next/navigation"
import { cache } from "react"
import { getUserForProfile } from "@/service/user"
import UserPosts from "@/components/UserPosts"
import UserProfile from "@/components/UserProfile"

interface Props {
  params: { username: string }
}

const getUser = cache(async (username: string) => getUserForProfile(username))

export default async function UserPage({ params: { username } }: Props) {
  const user = await getUser(username)

  if (!user) notFound()

  return (
    <section className="w-full">
      <UserProfile user={user} />
      <UserPosts user={user} />
    </section>
  )
}

export async function generateMetadata({
  params: { username },
}: Props): Promise<Metadata> {
  const user = await getUser(username)
  return {
    title: `${user?.name} (@${user?.username}) · Instagram Photos`,
    description: `${user?.name}'s all Instagram posts`,
  }
}
