import Image from "next/image"

interface Props {
  image?: string | null
  size: "small" | "normal"
  highlight?: boolean
}

export default function Avatar({
  image,
  size = "normal",
  highlight = false,
}: Props) {
  return (
    <div className={getContainerStyle(highlight)}>
      <Image
        src={image ?? ""}
        alt="avatar"
        width={size === "small" ? 40 : 60}
        height={size === "small" ? 40 : 60}
        referrerPolicy="no-referrer"
        className="bg-white rounded-full p-[0.15rem]"
      />
    </div>
  )
}

function getContainerStyle(highlight: boolean): string {
  const baseStyle = "rounded-full flex justify-center items-center"
  const highlightStyle = highlight
    ? "bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 p-[0.05rem]"
    : ""
  return `${baseStyle} ${highlightStyle}`
}
