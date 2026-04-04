"use client";

import Link from "next/link"
import { useMemo } from "react"
import { cn } from "@/lib/utils"
import { Content } from "../content"
import { Button } from "../ui/button"
import { useUser } from "@/context/use-user"
import { usePathname } from "next/navigation"
import { IconHamMenu, IconShoppingCart, LogoWithText, LogoWithTextWhite } from "../icons"
import { CustomerProfileDropdown } from "../customer/profile-dropdown";
import { VendorProfileDropdown } from "../vendor/profile-dropdown";

export const Header = () => {
    const { type } = useUser()
    const pathname = usePathname()

    const isWhite = useMemo(() => {
        return (pathname === "/") || (((pathname.startsWith("/cooks")) || (pathname.startsWith("/meals"))) && !pathname.startsWith("/meals/"))
    },[pathname])
    return (
        <header className={cn(isWhite ? "absolute inset-x-0 top-0 z-10" : "bg-white border-b border-b-outline")}>
            <Content className="py-0 md:py-0">
                <div className="flex items-center justify-between py-4">
                    <Link href="/">
                        {
                            isWhite ? <LogoWithTextWhite /> : <LogoWithText />
                        }
                    </Link>
                    <div className="flex items-center justify-end gap-5">
                        <Button type="button" size={type === null ? "icon-big" : "icon-lg"} variant={isWhite ? "secondary-dark" : "secondary"}>
                            <IconShoppingCart />
                        </Button>
                        <div className="md:flex items-center gap-5 hidden">
                            {
                                type === "customer" ? (
                                    <CustomerProfileDropdown />
                                ) : (type === "vendor") ? (
                                    <VendorProfileDropdown />
                                ) : (
                                    <>
                                        <Button type="button" variant={isWhite ? "secondary-dark" : "secondary"} asChild>
                                            <Link href="/customer/login">
                                                Sign in
                                            </Link>
                                        </Button>
                                        <Button type="button" asChild>
                                            <Link href="/vendor/register">
                                                Become a Cook
                                            </Link>
                                        </Button>
                                    </>
                                )
                            }
                        </div>
                        <Button type="button" size="icon-big" className="flex md:hidden">
                            <IconHamMenu />
                        </Button>
                    </div>
                </div>
            </Content>
        </header>
    )
}