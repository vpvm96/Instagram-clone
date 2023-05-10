import { ReactNode } from "react"
import reactDom from "react-dom"

interface Props {
  children: ReactNode
}

export default function ModalPortal({ children }: Props) {
  if (typeof window === "undefined") return null

  const node = document.getElementById("portal") as Element
  return reactDom.createPortal(children, node)
}
