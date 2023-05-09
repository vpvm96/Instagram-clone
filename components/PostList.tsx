"use client"

import useSWR from "swr"
import { SimplePost } from "@/model/post"
import GridSpinner from "./ui/GridSpinner"
import PostListCard from "./PostListCard"

export default function PostList() {
  const { data, isLoading } = useSWR<SimplePost[]>("api/posts")

  return (
    <section>
      {isLoading && (
        <div className="text-center mt-32">
          <GridSpinner />
        </div>
      )}
      {data && (
        <ul>
          {data.map((post, index) => (
            <li key={post.id} className="mb-4">
              <PostListCard post={post} priority={index < 2} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
