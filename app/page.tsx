import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import FollowingBar from "@/components/FollowingBar"
import PostList from "@/components/PostList"
import SideBar from "@/components/SideBar"

export default async function HomePage() {
  const session = await getServerSession(authOptions)
  const user = session?.user

  if (!user) {
    redirect("/auth/signin")
  }

  return (
    <section className="w-full flex flex-col md:flex-row max-w-[1000px] p-4">
      <div className="w-full basis-4/6 min-w-0">
        <FollowingBar />
        <PostList />
      </div>
      <div className="basis-2/6 ml-8">
        <SideBar user={user} />
      </div>
    </section>
  )
}
