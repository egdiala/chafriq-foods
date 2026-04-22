"use client";

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Content } from "../content"
import { Button } from "../ui/button"
import { useMemo, useState } from "react"
import { useUser } from "@/context/use-user"
import { usePathname } from "next/navigation"
import { VendorProfileDropdown } from "../vendor/profile-dropdown";
import { CustomerProfileDropdown } from "../customer/profile-dropdown";
import { IconChefHat, IconClose, IconHamMenu, IconUser, LogoWithText, LogoWithTextWhite } from "../icons"
import { CUSTOMER_HEADER_LINKS, ShoppingCartLink } from "../customer/header";
import { VENDOR_HEADER_LINKS } from "../vendor/header";
import { type RouteType } from "next/dist/lib/load-custom-routes";

export const HEADER_LINKS = [
    { icon: <IconUser />, text: "Sign in", href: "/customer/login" },
    { icon: <IconChefHat />, text: "Become a Cook", href: "/vendor/register" },
]

export const Header = () => {
    const { type } = useUser()
    const pathname = usePathname()
    const [openDrawer, setOpenDrawer] = useState(false)

    const headerLinks = useMemo(() => {
        return type === "customer" ? CUSTOMER_HEADER_LINKS : (type === "vendor") ? VENDOR_HEADER_LINKS : HEADER_LINKS
    },[type])

    const isWhite = useMemo(() => {
        return (pathname === "/") || (((pathname.startsWith("/cooks")) || (pathname.startsWith("/meals"))) && !pathname.startsWith("/meals/"))
    },[pathname])
    return (
        <>
        <header className={cn(isWhite ? `absolute inset-x-0 top-0 ${openDrawer ? "" : "z-10"}` : "bg-white border-b border-b-outline")}>
            <Content className="py-0 md:py-0">
                <div className="flex items-center justify-between py-4">
                    <Link href="/" className={cn(openDrawer ? "z-50" : "")}>
                        {
                            isWhite ? <LogoWithTextWhite className="h-7.5 lg:h-auto w-auto" /> : <LogoWithText className="h-7.5 lg:h-auto w-auto" />
                        }
                    </Link>
                    <div className="flex items-center justify-end gap-5">
                        <ShoppingCartLink />
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
                        <Button type="button" size={type === null ? "icon-big" : "icon-lg"} className={cn("flex lg:hidden", openDrawer ? "z-50" : "")} onClick={() => setOpenDrawer((prev) => !prev)}>
                            {openDrawer ? (<IconClose />) : (<IconHamMenu />)}
                        </Button>
                    </div>
                </div>
            </Content>
        </header>
        <div 
            className={cn(
                "absolute bg-grey-dark-1 inset-0 z-40 origin-top-right transform transition-all duration-500 lg:hidden",
                !openDrawer ? "-translate-x-full" : "translate-x-0"
            )}
        >
            <div className="flex flex-col flex-1 mt-48 items-center justify-center gap-14">
            {
                headerLinks.map((headerLink, index) => (
                    <Link
                        key={index}
                        href={headerLink.href as unknown as __next_route_internal_types__.RouteImpl<RouteType>}
                        onClick={() => setOpenDrawer((prev) => !prev)}
                        className={cn(
                            "flex items-center gap-3 relative text-base font-normal leading-6 text-white [&>svg]:text-orange-2 [&>svg]:size-6",
                            "after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full",
                            "after:scale-x-0 after:will-change-transform after:bg-orange-2",
                            "after:transition-transform after:duration-300 after:ease-in-out",
                            "hover:after:scale-x-100 hover:after:origin-center",
                            "transition-all duration-500 ease-out",
                        )}
                    >
                        {headerLink.icon}
                        {headerLink.text}
                    </Link>
                ))
            }
            </div>
        </div>
        </>
    )
}