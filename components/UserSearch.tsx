"use client"

import useSWR from "swr"
import { FormEvent, useState } from "react"
import { SearchUser } from "@/model/user"
import { useDebounce } from "@/hooks"
import GridSpinner from "./ui/GridSpinner"
import UserCard from "./UserCard"

export default function UserSearch() {
  const [keyword, setKeyword] = useState("")
  const debouncedKeyword = useDebounce(keyword)
  const { data, isLoading, error } = useSWR<SearchUser[]>(
    `/api/search/${debouncedKeyword}`
  )

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <section className="w-full max-w-2xl my-4 flex flex-col items-center">
      <form className="w-full mb-4" onSubmit={handleFormSubmit}>
        <input
          className="w-full text-xl p-3 outline-none border border-gray-400"
          type="text"
          autoFocus
          placeholder="Search for a username or name"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>
      {error && <p>에러가 발생 했습니다 🤣</p>}
      {isLoading && <GridSpinner />}
      {!isLoading && !error && data?.length === 0 && (
        <p>찾는 사용자가 없음 😘</p>
      )}
      <ul className="w-full p-4">
        {data &&
          data.map((user) => (
            <li key={user.username}>
              <UserCard user={user} />
            </li>
          ))}
      </ul>
    </section>
  )
}
