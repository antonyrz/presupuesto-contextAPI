import type { ReactNode } from "react"

type ErrorMessageProps = {
    children: ReactNode
}

export default function ErrorMessage({children} : ErrorMessageProps) {

  return (

    <p className="uppercase bg-red-600 p-2 text-white font-bold text-sm text-center error">
        {children}
    </p>
  )
}
