import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Spinner } from "./spinner";

function InputFile({ className, selectedFile, isLoading, ...props }: React.ComponentProps<"input"> & { isLoading?: boolean; selectedFile?: File | undefined; }) {
    const ref = React.useRef<HTMLInputElement>(null)

    const handleClick = () => ref.current?.click();
    return (
        <div onClick={handleClick} className="bg-input-field rounded px-3 py-1 text-sm text-grey-dark-0 transition-colors h-12 inset-ring-1 inset-ring-outline focus-visible:inset-ring-orange-2 focus-visible:bg-orange-5 flex items-center justify-between">
            <input
                ref={ref}
                type="file"
                data-slot="file-input"
                hidden
                className={cn(
                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 file:text-sm file:font-medium aria-invalid:ring-[3px] md:text-sm file:text-foreground placeholder:text-grey-dark-3 w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
                    " caret-grey-dark-0",
                    "aria-invalid:inset-ring-destructive dark:aria-invalid:inset-ring-destructive/50",
                    "transition-all duration-300 ease-out",
                    className
                )}
                {...props}
            />
            <span className="text-xs font-normal text-grey-dark-3">{(selectedFile as unknown as File)?.name || "Select a file"}</span>
            <Button variant="link" size="link" type="button" disabled={isLoading}>
                {(isLoading) ? (<Spinner className="absolute right-4 size-5" />) : "Select File"}
            </Button>
        </div>
    )
}

export { InputFile }
