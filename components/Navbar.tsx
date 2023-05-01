"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signIn, signOut } from "next-auth/react"
import {
  HomeIcon,
  HomeFillIcon,
  NewFillIcon,
  NewIcon,
  SearchFillIcon,
  SearchIcon,
} from "./ui/icons"
import ColorButton from "./ui/ColorButton"

const menu = [
  {
    href: "/",
    icon: <HomeIcon />,
    activeIcon: <HomeFillIcon />,
  },
  {
    href: "/search",
    icon: <SearchIcon />,
    activeIcon: <SearchFillIcon />,
  },
  {
    href: "/new",
    icon: <NewIcon />,
    activeIcon: <NewFillIcon />,
  },
]

export default function Navbar() {
  const pathName = usePathname()
  const { data: session } = useSession()

  return (
    <div className="flex justify-between items-center px-6">
      <Link href="/">
        <h1 className="text-3xl font-bold">Instagram</h1>
      </Link>
      <nav>
        <ul className="flex gap-4 items-center p-4">
          {menu.map(({ href, icon, activeIcon }) => (
            <li key={href}>
              <Link href={href}>{pathName === href ? activeIcon : icon}</Link>
            </li>
          ))}
          {session ? (
            <ColorButton text="Sign out" onClick={() => signOut()} />
          ) : (
            <ColorButton text="Sign in" onClick={() => signIn()} />
          )}
        </ul>
      </nav>
    </div>
  )
}
