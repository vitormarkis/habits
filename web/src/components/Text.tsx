import clsx from "clsx"

interface TextProps {
  children?: React.ReactNode
  weight: "semibold" | "extrabold"
  color?: "white" | "zinc"
  size: "big" | "medium"
}

const Text = ({weight, color = 'white', size, children}: TextProps) => {
  return (
    <span
      className={clsx({
        "font-semibold": weight === "semibold",
        "font-extrabold": weight === "extrabold",
        "text-zinc-400": color === "zinc",
        "text-white": color === "white",
        "text-3xl": size === "big",
        "text-base": size === "medium",
      })}
    >
      {children}
    </span>
  )
}

export default Text
