import { type ReactNode } from "react"
import Image from "next/image"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-20 overflow-hidden">
      <div className="w-[200px]">
        <Image
          className="w-full"
          width={242}
          height={66}
          src="/logo.png"
          alt="retry logo"
        />
      </div>
      <div>{children}</div>
    </div>
  )
}
