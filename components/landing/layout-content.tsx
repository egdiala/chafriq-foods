"use client"

import { usePathname } from "next/navigation"
import { Footer } from "./footer"
import { Header } from "./header"
import { cn } from "@/lib/utils"
import { useMemo } from "react"

const flexUrls = [
    "/contact-us",
    "/vendor/forgot-password",
    "/vendor/reset-password",
    "/vendor/login"
]

export const LayoutContent = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const pathname = usePathname()

    const isFlex = useMemo(() => {
        return flexUrls.includes(pathname)
    }, [pathname])
    
    return (
        <main className={cn("relative h-full", isFlex && "flex flex-col")}>
            <Header />
            {children}
            <Footer />
        </main>
    )
}