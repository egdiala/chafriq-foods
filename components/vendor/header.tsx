"use client";

import Link from "next/link";
import { Content } from "../content";
import { NavItem } from "./nav-item";
import { Button } from "../ui/button";
import { type RouteType } from "next/dist/lib/load-custom-routes";
import { IconArrowDown, IconBell, IconBowlSteam, IconChartBar, IconChartLine, IconHamMenu, IconStorefront, LogoWithText } from "../icons";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const VendorHeader = () => {
    const headerLinks = [
        { icon: <IconChartLine />, text: "Dashboard", href: "/vendor" },
        { icon: <IconBowlSteam />, text: "Orders", href: "/vendor/orders" },
        { icon: <IconStorefront />, text: "Storefront", href: "/vendor/store" },
        { icon: <IconChartBar />, text: "Reporting", href: "/vendor/report" },
    ]
    return (
        <nav className="lg:rounded-3xl bg-white lg:border-b-0 border-b border-b-outline">
            <Content className="py-0 md:py-0 md:px-4">
                <div className="flex items-center justify-between py-4">
                    <Link href="/vendor">
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
                        <DropdownMenu>
                            <DropdownMenuTrigger className="hidden lg:flex items-center gap-1 p-1 bg-orange-5 rounded-full [&_svg]:text-grey-dark-3 data-[state=open]:[&_svg]:-rotate-180">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <span className="font-medium text-sm text-grey-dark-2">Diala</span>
                                <IconArrowDown className="transition-transform duration-200 ease-linear" />
                            </DropdownMenuTrigger>
                        </DropdownMenu>
                    </div>
                </div>
            </Content>
        </nav>
    )
}