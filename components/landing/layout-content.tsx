"use client"

import { usePathname } from "next/navigation"
import { Footer } from "./footer"
import { Header } from "./header"
import { cn } from "@/lib/utils"
import { useEffect, useMemo } from "react"
import { useUser } from "@/context/use-user"
import { useUserLocation } from "@/hooks/use-user-location"

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

export const LayoutContent = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const pathname = usePathname()

    const isFlex = useMemo(() => {
        return flexUrls.includes(pathname)
    }, [pathname])
    
    const { location, setLocation } = useUser();

    const { getLocation, loading, error } = useUserLocation((coords) => {
        setLocation(coords);
    });

    useEffect(() => {
        if (!location) {
            getLocation() 
        }
    },[location])
    
    return (
        <main className={cn("relative h-full", isFlex && "flex flex-col")}>
            <Header />
            {children}
            <Footer />
        </main>
    )
}