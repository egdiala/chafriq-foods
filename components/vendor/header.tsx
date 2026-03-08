"use client";

import Link from "next/link";
import { Content } from "../content";
import { NavItem } from "./nav-item";
import { Button } from "../ui/button";
import { type RouteType } from "next/dist/lib/load-custom-routes";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { IconArrowDown, IconBell, IconBowlSteam, IconChartBar, IconChartLine, IconChefHat, IconCurrencyDollar, IconHamMenu, IconHeadset, IconSignOut, IconStorefront, IconUser, LogoWithText } from "../icons";

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
                            <DropdownMenuContent className="p-2.5! w-50 origin-top-right space-y-2" align="end" sideOffset={8}>
                                <div className="flex items-center gap-2">
                                    <Avatar size="lg">
                                        <AvatarImage src="https://github.com/shadcn.png" className="rounded-xl" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-px">
                                        <span className="font-medium text-sm text-grey-dark-1">Stephen Diala</span>
                                        <div className="flex items-center px-1 gap-1 bg-orange-5 rounded-xl h-4.5 w-fit uppercase text-orange-2 text-[0.625rem] [&>svg]:size-3">
                                            <IconChefHat /> cook
                                        </div>
                                    </div>
                                </div>
                                <DropdownMenuSeparator className="mx-px" />
                                <DropdownMenuGroup className="mt-2">
                                    <DropdownMenuItem className="[&>svg]:text-orange-2 not-data-[variant=destructive]:focus:**:text-orange-2!">
                                        <IconUser />
                                        View Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="[&>svg]:text-orange-2 not-data-[variant=destructive]:focus:**:text-orange-2!">
                                        <IconCurrencyDollar />
                                        Payout
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="[&>svg]:text-orange-2 not-data-[variant=destructive]:focus:**:text-orange-2!">
                                        <IconHeadset />
                                        Support
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="[&>svg]:text-orange-2 not-data-[variant=destructive]:focus:**:text-orange-2!">
                                        <IconSignOut />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </Content>
        </nav>
    )
}