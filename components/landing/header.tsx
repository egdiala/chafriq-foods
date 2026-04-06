"use client";

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Content } from "../content"
import { Button } from "../ui/button"
import { useMemo, useState } from "react"
import { useUser } from "@/context/use-user"
import { usePathname } from "next/navigation"
import { IconClose, IconHamMenu, IconShoppingCart, LogoWithText, LogoWithTextWhite } from "../icons"
import { CustomerProfileDropdown } from "../customer/profile-dropdown";
import { VendorProfileDropdown } from "../vendor/profile-dropdown";

export const Header = () => {
    const { type } = useUser()
    const pathname = usePathname()
    const [openDrawer, setOpenDrawer] = useState(false)

    const isWhite = useMemo(() => {
        return (pathname === "/") || (((pathname.startsWith("/cooks")) || (pathname.startsWith("/meals"))) && !pathname.startsWith("/meals/"))
    },[pathname])
    return (
        <>
        <header className={cn(isWhite ? "absolute inset-x-0 top-0 z-10" : "bg-white border-b border-b-outline")}>
            <Content className="py-0 md:py-0">
                <div className="flex items-center justify-between py-4">
                    <Link href="/" className={cn(openDrawer ? "z-50" : "")}>
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
                        <Button type="button" size="icon-big" className={cn("flex md:hidden", openDrawer ? "z-50" : "")} onClick={() => setOpenDrawer((prev) => !prev)}>
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
                    <Link
                        href="/customer/login"
                        onClick={() => setOpenDrawer((prev) => !prev)}
                        className={cn(
                            "flex items-center relative text-base font-normal leading-6 text-white",
                            "after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full",
                            "after:scale-x-0 after:will-change-transform after:bg-orange-2",
                            "after:transition-transform after:duration-300 after:ease-in-out",
                            "hover:after:scale-x-100 hover:after:origin-center",
                            "transition-all duration-500 ease-out",
                        )}
                    >
                        Sign in
                    </Link>
                    <Link
                        href="/vendor/register"
                        onClick={() => setOpenDrawer((prev) => !prev)}
                        className={cn(
                            "flex items-center relative text-base font-normal leading-6 text-white",
                            "after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full",
                            "after:scale-x-0 after:will-change-transform after:bg-orange-2",
                            "after:transition-transform after:duration-300 after:ease-in-out",
                            "hover:after:scale-x-100 hover:after:origin-center",
                            "transition-all duration-500 ease-out",
                        )}
                    >
                        Become a Cook
                    </Link>
            </div>
        </div>
        </>
    )
}