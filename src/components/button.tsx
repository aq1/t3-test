import { type ComponentProps, forwardRef } from "react"

const Button = forwardRef<HTMLButtonElement, ComponentProps<"button">>(
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
