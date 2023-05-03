import { getServerSession } from "next-auth"
import { getProviders } from "next-auth/react"
import { redirect } from "next/navigation"
import { GET } from "@/app/api/auth/[...nextauth]/route"
import Signin from "@/components/Signin"

interface Props {
  searchParams: {
    callbackUrl: string
  }
}

export default async function SignPage({
  searchParams: { callbackUrl },
}: Props) {
  const session = await getServerSession(GET)

  if (session) {
    redirect("/")
  }

  const providers = (await getProviders()) ?? {}

  return (
    <section className="flex justify-center mt-24">
      <Signin providers={providers} callbackUrl={callbackUrl ?? "/"} />
    </section>
  )
}
