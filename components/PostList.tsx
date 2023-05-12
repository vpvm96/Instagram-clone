"use client"

import { usePosts } from "@/hooks"
import GridSpinner from "./ui/GridSpinner"
import PostListCard from "./PostListCard"

export default function PostList() {
  const { posts, isLoading } = usePosts()

  return (
    <section>
      {isLoading && (
        <div className="text-center mt-32">
          <GridSpinner />
        </div>
      )}
      {posts && (
        <ul>
          {posts.map((post, index) => (
            <li key={post.id} className="mb-4">
              <PostListCard post={post} priority={index < 2} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
