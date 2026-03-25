"use client";

import Link from "next/link";
import { Content } from "../content";
import { NavItem } from "./nav-item";
import { Button } from "../ui/button";
import { VendorProfileDropdown } from "./profile-dropdown";
import { type RouteType } from "next/dist/lib/load-custom-routes";
import { IconBell, IconBowlSteam, IconChartBar, IconChartLine, IconHamMenu, IconStorefront, LogoWithText } from "../icons";

export const VendorHeader = () => {
    const headerLinks = [
        { icon: <IconChartLine />, text: "Dashboard", href: "/vendor" },
        { icon: <IconBowlSteam />, text: "Orders", href: "/vendor/orders" },
        { icon: <IconStorefront />, text: "Storefront", href: "/vendor/storefront" },
        { icon: <IconChartBar />, text: "Reporting", href: "/vendor/report" },
    ]
    return (
        <nav className="lg:rounded-3xl bg-white lg:border-b-0 border-b border-b-outline">
            <Content className="py-0 md:py-0 md:px-4">
                <div className="flex items-center justify-between py-4">
                    <Link href="/">
                        <LogoWithText className="h-7.5 lg:h-auto w-auto" />
                    </Link>
                    <div className="hidden lg:flex flex-1 items-center justify-center gap-6">
                    {
                        headerLinks.map(({ icon, text, ...props }, index) => (
                            <NavItem key={index} href={props.href as unknown as __next_route_internal_types__.RouteImpl<RouteType>}>
                                {icon}
                                {text}
                            </NavItem>
                        ))
                    }
                    </div>
                    <div className="flex items-center justify-end gap-5">
                        <Button type="button" size="icon-lg" variant="secondary">
                            <IconBell />
                        </Button>
                        <Button type="button" size="icon-lg" className="flex lg:hidden">
                            <IconHamMenu />
                        </Button>
                        <VendorProfileDropdown />
                    </div>
                </div>
            </Content>
        </nav>
    )
}