export interface AuthUser {
  name: string
  username: string
  email: string
  image?: string
}

export interface SimpleUser {
  username: AuthUser["username"]
  image: AuthUser["image"]
}

export interface HomeUser extends AuthUser {
  following: SimpleUser[]
  followers: SimpleUser[]
  bookmarks: string[]
}

export interface SearchUser extends Omit<HomeUser, "following" | "followers"> {
  following: number
  followers: number
}

export interface ProfileUser extends SearchUser {
  posts: number
}
