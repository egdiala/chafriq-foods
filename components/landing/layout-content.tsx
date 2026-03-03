"use client"

import { usePathname } from "next/navigation"
import { Footer } from "./footer"
import { Header } from "./header"
import { cn } from "@/lib/utils"
import { useMemo } from "react"

export const LayoutContent = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const pathname = usePathname()

    const isFlex = useMemo(() => {
        return pathname === "/contact-us"
    }, [pathname])
    
    return (
        <main className={cn("relative h-full", isFlex && "flex flex-col")}>
            <Header />
            {children}
            <Footer />
        </main>
    )
}