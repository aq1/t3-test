import { forwardRef, type ReactNode } from "react"

interface ButtonProps {
  placeholder?: string
  children?: ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, forwardedRef) => (
    <button
      {...props}
      className="h-full w-full rounded-xl bg-green-500 p-3 px-5 font-bold text-gray-500"
      ref={forwardedRef}
    >
      {props.children}
    </button>
  )
)

Button.displayName = "Button"
export default Button
