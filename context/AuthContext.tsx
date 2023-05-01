"use client"

import { ReactNode } from "react"
import { SessionProvider } from "next-auth/react"

interface Props {
  children: ReactNode
}

export default function AuthContext({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>
}
