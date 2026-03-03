import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "bg-input-field aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 rounded px-3 py-1 text-sm text-grey-dark-0 transition-colors h-12 file:text-sm file:font-medium aria-invalid:ring-[3px] md:text-sm file:text-foreground placeholder:text-grey-dark-3 w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "inset-ring-1 inset-ring-outline focus-visible:inset-ring-orange-2 focus-visible:bg-orange-5 caret-grey-dark-0",
        "aria-invalid:inset-ring-destructive dark:aria-invalid:inset-ring-destructive/50",
        "transition-all duration-300 ease-out",
        className
      )}
      {...props}
    />
  )
}

export { Input }
