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
import Avatar from "./Avatar"

const menu = [
  {
    href: "/",
    icon: <HomeIcon />,
    activeIcon: <HomeFillIcon />,
    title: "Home",
  },
  {
    href: "/search",
    icon: <SearchIcon />,
    activeIcon: <SearchFillIcon />,
    title: "Search users",
  },
  {
    href: "/new",
    icon: <NewIcon />,
    activeIcon: <NewFillIcon />,
    title: "New post",
  },
]

export default function Navbar() {
  const pathName = usePathname()
  const { data: session } = useSession()
  const user = session?.user

  return (
    <div className="flex justify-between items-center px-6">
      <Link href="/" aria-label="Home">
        <h1 className="text-3xl font-bold">Instagram</h1>
      </Link>
      <nav>
        <ul className="flex gap-4 items-center p-4">
          {menu.map(({ href, icon, activeIcon, title }) => (
            <li key={href}>
              <Link href={href} aria-label={title}>
                {pathName === href ? activeIcon : icon}
              </Link>
            </li>
          ))}
          {user && (
            <li>
              <Link href={`/user/${user.username}`} aria-label={user.username}>
                <Avatar image={user.image} size="small" highlight />
              </Link>
            </li>
          )}
          <li>
            {session ? (
              <ColorButton text="Sign out" onClick={() => signOut()} />
            ) : (
              <ColorButton text="Sign in" onClick={() => signIn()} />
            )}
          </li>
        </ul>
      </nav>
    </div>
  )
}
