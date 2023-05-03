interface Props {
  text: string
  size?: "small" | "large"
  onClick: () => void
}

export default function ColorButton({ text, size = "small", onClick }: Props) {
  return (
    <div
      className={`rounded-md bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 ${
        size === "large" ? "p-[0.3rem]" : "p-[0.15rem]"
      }`}
    >
      <button
        className={`bg-white rounded-sm text-base hover:opacity-90 transition-opacity ${
          size === "large" ? "p-4 text-2xl" : "p-[0.3rem] text-base"
        }`}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  )
}
