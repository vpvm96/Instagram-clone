import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getUserByUsername } from "@/service/user"

export async function GET(requset: Request) {
  const session = await getServerSession(authOptions)
  const user = session?.user

  if (!user) return new Response("Authentication Error", { status: 401 })

  return getUserByUsername(user.username).then((data) =>
    NextResponse.json(data)
  )
}
