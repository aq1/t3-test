import { type ComponentProps, forwardRef } from "react"

const Input = forwardRef<HTMLInputElement, ComponentProps<"input">>(
  (props, forwardedRef) => (
    <input
      {...props}
      className="h-full w-full rounded-xl border border-gray-300 bg-gray-400 p-3 px-5 text-gray-100 outline-none placeholder:text-gray-100"
      ref={forwardedRef}
    />
  )
)

Input.displayName = "Input"
export default Input
