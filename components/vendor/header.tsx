"use client";

import Link from "next/link";
import { Content } from "../content";
import { NavItem } from "./nav-item";
import { Button } from "../ui/button";
import { type RouteType } from "next/dist/lib/load-custom-routes";
import { IconBell, IconChartLine, IconHamMenu, LogoWithText } from "../icons";

export const VendorHeader = () => {
    const headerLinks = [
        { icon: <IconChartLine />, text: "Dashboard", href: "/vendor" },
        { icon: <IconChartLine />, text: "Orders", href: "/vendor/orders" },
        { icon: <IconChartLine />, text: "Storefront", href: "/vendor/store" },
        { icon: <IconChartLine />, text: "Reporting", href: "/vendor/report" },
    ]
    return (
        <nav className="lg:rounded-3xl bg-white lg:border-b-0 border-b border-b-outline">
            <Content className="py-0 md:py-0 md:px-5">
                <div className="flex items-center justify-between py-4">
                    <Link href="/vendor">
                        <LogoWithText />
                    </Link>
                    <div className="flex flex-1 items-center justify-center gap-6">
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
                        <div className="md:flex items-center gap-5 hidden">
                            <Button type="button" variant="secondary" asChild>
                                <Link href="/customer/login">
                                    Sign in
                                </Link>
                            </Button>
                            <Button type="button" asChild>
                                <Link href="/vendor/register">
                                    Become a Cook
                                </Link>
                            </Button>
                        </div>
                        <Button type="button" size="icon-big" className="flex md:hidden">
                            <IconHamMenu />
                        </Button>
                    </div>
                </div>
            </Content>
        </nav>
    )
}