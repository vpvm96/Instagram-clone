"use client"

import { createContext, useContext } from "react"

interface CachekeysValue {
  postsKey: string
}

export const CacheKeysContext = createContext<CachekeysValue>({
  postsKey: "/api/posts",
})

export const useCacheKeys = () => useContext(CacheKeysContext)
