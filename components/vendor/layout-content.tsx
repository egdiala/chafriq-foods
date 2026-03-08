"use client"

import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useMemo } from "react"
import { VendorHeader } from "./header"

const flexUrls = [
    "/contact-us",
    "/vendor/forgot-password",
    "/vendor/reset-password",
    "/vendor/login",
    "/vendor/register",
    "/customer/forgot-password",
    "/customer/reset-password",
    "/customer/login",
    "/customer/register",
]

export const VendorLayoutContent = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const pathname = usePathname()

    const isFlex = useMemo(() => {
        return flexUrls.includes(pathname)
    }, [pathname])
    
    return (
        <main className={cn("relative min-h-full lg:bg-orange-5 lg:p-4 lg:space-y-4", isFlex && "flex flex-col")}>
            <VendorHeader />
            {children}
        </main>
    )
}