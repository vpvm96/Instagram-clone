import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getPost } from "@/service/posts"

interface Context {
  params: { id: string }
}

export async function GET(requset: NextRequest, context: Context) {
  const session = await getServerSession(authOptions)
  const user = session?.user

  if (!user) return new Response("Authentication Error", { status: 401 })

  return getPost(context.params.id) //
    .then((data) => NextResponse.json(data))
}
