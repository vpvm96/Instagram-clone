import { ReactNode } from "react"

interface Props {
  toggled: boolean
  onToggle: (toggled: boolean) => void
  onIcon: ReactNode
  offIcon: ReactNode
  title: string
}

export default function ToggleButton({
  toggled,
  onToggle,
  onIcon,
  offIcon,
  title,
}: Props) {
  return (
    <button aria-label={title} onClick={() => onToggle(!toggled)}>
      {toggled ? onIcon : offIcon}
    </button>
  )
}
