import { NextRequest, NextResponse } from "next/server"
import { addComment } from "@/service/posts"
import { withSessionUser } from "@/utils/session"

export async function POST(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { id, comment, commentId } = await req.json()

    if (!id || comment == null)
      return new Response("Bad Request", { status: 400 })

    return addComment(id, user.id, comment, commentId)
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }))
  })
}
