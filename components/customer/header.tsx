"use client";

import Link from "next/link";
import { Content } from "../content";
import { Button } from "../ui/button";
import { type RouteType } from "next/dist/lib/load-custom-routes";
import { IconChefHat, IconClose, IconForkKnife, IconHamMenu, IconHeadset, IconShoppingCart, IconSignOut, IconUser, LogoWithText } from "../icons";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CustomerProfileDropdown } from "./profile-dropdown";
import { Logout } from "../vendor/logout";
import { CustomerNotificationsDropdown } from "./notifications-dropdown";
import { useGetCart } from "@/services/queries/use-orders";
import { useUser } from "@/context/use-user";

export const CustomerHeader = () => {
    const [openDrawer, setOpenDrawer] = useState(false)
    const [openLogout, setOpenLogout] = useState(false)

    const headerLinks = [
        { icon: <IconUser />, text: "Profile", href: "/customer/profile" },
        { icon: <IconForkKnife />, text: "Explore Meals", href: "/meals" },
        { icon: <IconChefHat />, text: "Explore Cooks", href: "/cooks" },
        { icon: <IconHeadset />, text: "Support", href: "#" },
    ]
    return (
        <>
        <header className={cn("bg-white border-b border-b-input-field")}>
            <Content className="py-0 md:py-0">
                <div className="flex items-center justify-between py-4">
                    <Link href="/" className={cn(openDrawer ? "z-50" : "")}>
                        <LogoWithText />
                    </Link>
                    <div className="flex items-center justify-end gap-5">
                        <ShoppingCartLink />
                        <CustomerNotificationsDropdown />
                        <CustomerProfileDropdown />
                        <Button type="button" size="icon-lg" className={cn("flex lg:hidden", openDrawer ? "z-50" : "")} onClick={() => setOpenDrawer((prev) => !prev)}>
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
                <button 
                    type="button" 
                    onClick={() => {
                        setOpenDrawer((prev) => !prev)
                        setOpenLogout(true)
                    }}
                    className="flex items-center gap-3 text-base font-normal leading-6 text-white [&>svg]:text-orange-2 [&>svg]:size-6"
                >
                    <IconSignOut /> Logout
                </button>
            </div>
        </div>
        <Logout open={openLogout} setOpen={setOpenLogout} />
        </>
    )
}

export const ShoppingCartLink = () => {
    const { type } = useUser()
    const { data } = useGetCart()

    if (type !== "customer") {
        return null;
    }

    return (
        <div className="relative">
            <span className="absolute -top-0.5 -right-0.5 z-1 text-xs font-medium text-white rounded-full bg-error p-px px-1.5">{data?.data?.length}</span>
            <Button type="button" size="icon-lg" variant="secondary">
                <IconShoppingCart />
            </Button>
        </div>
    )
}