import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { addUser } from "@/service/user"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user: { id, email, name, image } }) {
      if (!email) return false
      addUser({
        id,
        email,
        name: name || "",
        image,
        username: email.split("@")[0],
      })
      return true
    },
    async session({ session }) {
      const user = session.user
      if (user) {
        session.user = {
          ...user,
          username: user.email?.split("@")[0] || "",
        }
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
}

export default NextAuth(authOptions)
