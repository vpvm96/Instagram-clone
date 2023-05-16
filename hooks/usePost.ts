import useSWR, { useSWRConfig } from "swr"
import { useCallback } from "react"
import { FullPost, Comment } from "@/model/post"

async function addComment(id: string, comment: string) {
  return fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({
      id,
      comment,
      commentId: new Date().getTime().toString(),
    }),
  }).then((res) => res.json())
}

export default function usePost(postId: string) {
  const {
    data: post,
    isLoading,
    error,
    mutate,
  } = useSWR<FullPost>(`/api/posts/${postId}`)

  const { mutate: globalMutate } = useSWRConfig()

  const postComment = useCallback(
    (comment: Comment) => {
      if (!post) return
      const newPost = {
        ...post,
        comments: [...post.comments, comment],
      }

      return mutate(addComment(post.id, comment.comment), {
        optimisticData: newPost,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      }).then(() => globalMutate(`/api/posts`))
    },
    [post, mutate, globalMutate]
  )

  return { post, isLoading, error, postComment }
}
