import Image from "next/image"

interface Props {
  image?: string | null
}

export default function Avatar({ image }: Props) {
  return (
    <div className="rounded-full bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300">
      <Image
        src={image ?? ""}
        alt="avatar"
        width={40}
        height={40}
        referrerPolicy="no-referrer"
        className="rounded-full p-[0.1rem]"
      />
    </div>
  )
}
