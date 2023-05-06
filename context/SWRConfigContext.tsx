"use client"

import { ReactNode } from "react"
import { SWRConfig } from "swr"

interface Props {
  children: ReactNode
}

export default function SWRConfigContext({ children }: Props) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then((res) => res.json()),
      }}
    >
      {children}
    </SWRConfig>
  )
}
