
import Link from "next/link";
import { useState } from "react";
import { Logout } from "../vendor/logout";
import { useUser } from "@/context/use-user";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IconArrowDown, IconChefHat, IconCookingPot, IconForkKnife, IconHeadset, IconSignOut, IconUser } from "../icons";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

export const CustomerProfileDropdown = () => {
    const { user } = useUser()
    const [openLogout, setOpenLogout] = useState(false)
    return (
        <>
        <DropdownMenu>
            <DropdownMenuTrigger className="hidden lg:flex items-center gap-1 p-1 bg-orange-5 rounded-full [&_svg]:text-grey-dark-3 data-[state=open]:[&_svg]:-rotate-180">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>{user?.first_name?.[0]}{user?.last_name?.[0]}</AvatarFallback>
                </Avatar>
                <span className="font-medium text-sm text-grey-dark-2">{user?.first_name}</span>
                <IconArrowDown className="transition-transform duration-200 ease-linear" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2.5! w-50 origin-top-right space-y-2" align="end" sideOffset={8}>
                <div className="flex items-center gap-2">
                    <Avatar size="lg">
                        <AvatarImage src="https://github.com/shadcn.png" className="rounded-xl" />
                        <AvatarFallback>{user?.first_name?.[0]}{user?.last_name?.[0]}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-px">
                        <span className="font-medium text-sm text-grey-dark-1">{user?.first_name} {user?.last_name}</span>
                        <div className="flex items-center px-1 gap-1 bg-orange-5 rounded-xl h-4.5 w-fit uppercase text-orange-2 text-[0.625rem] [&>svg]:size-3">
                            <IconCookingPot /> customer
                        </div>
                    </div>
                </div>
                <DropdownMenuSeparator className="mx-px" />
                <DropdownMenuGroup className="mt-2">
                    <DropdownMenuItem className="[&>svg]:text-orange-2 not-data-[variant=destructive]:focus:**:text-orange-2!" asChild>
                        <Link href="/vendor/profile">
                            <IconUser />
                            Profile
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="[&>svg]:text-orange-2 not-data-[variant=destructive]:focus:**:text-orange-2!" asChild>
                        <Link href="/meals">
                            <IconForkKnife />
                            Explore Meals
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="[&>svg]:text-orange-2 not-data-[variant=destructive]:focus:**:text-orange-2!" asChild>
                        <Link href="/meals">
                            <IconChefHat />
                            Explore Cooks
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="[&>svg]:text-orange-2 not-data-[variant=destructive]:focus:**:text-orange-2!">
                        <IconHeadset />
                        Support
                    </DropdownMenuItem>
                    <DropdownMenuItem className="[&>svg]:text-orange-2 not-data-[variant=destructive]:focus:**:text-orange-2!" asChild>
                        <button type="button" className="w-full" onClick={() => setOpenLogout(true)}>
                            <IconSignOut />
                            Logout
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
        <Logout open={openLogout} setOpen={setOpenLogout} />
        </>
    )
}