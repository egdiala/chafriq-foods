"use client";

import Link from "next/link";
import { Content } from "../content";
import { NavItem } from "./nav-item";
import { Button } from "../ui/button";
import { VendorProfileDropdown } from "./profile-dropdown";
import { type RouteType } from "next/dist/lib/load-custom-routes";
import { IconBowlSteam, IconChartBar, IconChartLine, IconClose, IconHamMenu, IconStorefront, LogoWithText } from "../icons";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { VendorNotificationsDropdown } from "./notifications-dropdown";

export const VENDOR_HEADER_LINKS = [
    { icon: <IconChartLine />, text: "Dashboard", href: "/vendor" },
    { icon: <IconBowlSteam />, text: "Orders", href: "/vendor/orders" },
    { icon: <IconStorefront />, text: "Storefront", href: "/vendor/storefront" },
    { icon: <IconChartBar />, text: "Reporting", href: "/vendor/reporting" },
]

export const VendorHeader = () => {
    const [openDrawer, setOpenDrawer] = useState(false)

    return (
        <>
        <nav className="lg:rounded-3xl bg-white lg:border-b-0 border-b border-b-outline sticky top-0 inset-x-0 z-50">
            <Content className="py-0 md:py-0 md:px-4">
                <div className="flex items-center justify-between py-4">
                    <Link href="/" className={cn(openDrawer ? "z-50" : "")}>
                        <LogoWithText className="h-7.5 lg:h-auto w-auto" />
                    </Link>
                    <div className="hidden lg:flex flex-1 items-center justify-center gap-6">
                    {
                        VENDOR_HEADER_LINKS.map(({ icon, text, ...props }, index) => (
                            <NavItem key={index} href={props.href as unknown as __next_route_internal_types__.RouteImpl<RouteType>}>
                                {icon}
                                {text}
                            </NavItem>
                        ))
                    }
                    </div>
                    <div className="flex items-center justify-end gap-5">
                        <VendorNotificationsDropdown />
                        <Button type="button" size="icon-lg" className={cn("flex lg:hidden", openDrawer ? "z-50" : "")} onClick={() => setOpenDrawer((prev) => !prev)}>
                            {openDrawer ? (<IconClose />) : (<IconHamMenu />)}
                        </Button>
                        <VendorProfileDropdown />
                    </div>
                </div>
            </Content>
        </nav>
        <div 
            className={cn(
                "absolute bg-grey-dark-1 inset-0 z-40 origin-top-right transform transition-all duration-500 lg:hidden",
                !openDrawer ? "-translate-x-full" : "translate-x-0"
            )}
        >
            <div className="flex flex-col flex-1 mt-48 items-center justify-center gap-6">
            {
                VENDOR_HEADER_LINKS.map(({ icon, text, ...props }, index) => (
                    <Link key={index} className="flex items-center gap-3 text-white text-base py-4 [&>svg]:text-orange-2 [&>svg]:size-6" onClick={() => setOpenDrawer((prev) => !prev)} href={props.href as unknown as __next_route_internal_types__.RouteImpl<RouteType>}>
                        {icon}
                        {text}
                    </Link>
                ))
            }
            </div>
        </div>
        </>
    )
}