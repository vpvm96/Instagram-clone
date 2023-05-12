import { NextRequest, NextResponse } from "next/server"
import { getPost } from "@/service/posts"
import { withSessionUser } from "@/utils/session"

interface Context {
  params: { id: string }
}

export async function GET(_: NextRequest, context: Context) {
  return withSessionUser(async (user) => {
    return getPost(context.params.id) //
      .then((data) => NextResponse.json(data))
  })
}
