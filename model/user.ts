export interface User {
  name: string
  username: string
  email: string
  image?: string
}

export interface SimpleUser {
  username: User["username"]
  image: User["image"]
}

export interface DetailUser extends User {
  following: SimpleUser[]
  followers: SimpleUser[]
  bookmarks: string[]
}
