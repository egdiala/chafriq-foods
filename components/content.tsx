import { cn } from "@/lib/utils"
import { forwardRef, ReactNode } from "react"

type Props = {
    children: ReactNode
    className?: string
}

export const Content = forwardRef<HTMLDivElement, Props>(({ children, className }, ref) => {
    return (
        <div ref={ref} className={cn("w-full max-w-screen-2xl mx-auto px-5 md:px-10 py-12.5 md:py-25", className)}>
            {children}
        </div>
    )
})

Content.displayName = "Content"