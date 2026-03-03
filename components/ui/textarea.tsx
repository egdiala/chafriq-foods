import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "bg-input-field resize-none rounded px-3 py-3 transition-colors text-sm text-grey-dark-0 md:text-sm placeholder:text-muted-foreground flex field-sizing-content min-h-16 w-full outline-none disabled:cursor-not-allowed disabled:opacity-50",
        "inset-ring-1 inset-ring-outline focus-visible:inset-ring-orange-2 focus-visible:bg-orange-5 caret-grey-dark-0",
        "aria-invalid:inset-ring-destructive dark:aria-invalid:inset-ring-destructive/50",
        "transition-all duration-300 ease-out",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
