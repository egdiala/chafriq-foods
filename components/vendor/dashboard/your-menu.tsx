"use client";

import { IconBowlFood } from "@/components/icons";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useGetMenuList } from "@/services/queries/use-menu";
import Link from "next/link";

type Props = {
    className?: string;
}

export const YourMenu = ({ className }: Props) => {
    const { data, isLoading } = useGetMenuList({})

    return (
        <div className={cn("flex flex-col gap-3 p-5 rounded-2xl inset-ring-1 inset-ring-outline", className)}>
            <h2 className="font-semibold text-base text-grey-dark-0">Your Menu</h2>
            {
                isLoading ? (
                    <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
                    {
                        Array.from({ length: 4 }).map((_, index) => (
                            <div key={index}>
                                <Skeleton className="h-15.5" />
                            </div>
                        ))
                    }
                    </div>
                ) : (!isLoading && data && (data?.data.length > 0)) ? (
                    <>
                    {
                        data?.data?.slice(0, 4)?.map((menu) => (
                            <Link href={`/vendor/storefront?menu_id=${menu.menu_id}`} key={menu.menu_id} className="flex items-center gap-2 rounded-lg p-3 inset-ring-1 inset-ring-outline hover:inset-ring-orange-2 hover:bg-orange-5/30">
                                <div className="rounded-xl overflow-hidden size-9.5">
                                    <Avatar className="rounded-xl size-9.5">
                                        <AvatarImage src={menu.file_url} alt="food" className="rounded-xl size-9.5 object-cover object-center" />
                                    </Avatar>
                                </div>
                                <div className="grid gap-px flex-1">
                                    <div className="flex items-center gap-1">
                                        <span className="font-medium text-xs text-grey-dark-2 flex-1">{menu.menu_name}</span>
                                        <span className="font-medium text-xs text-grey-dark-2 text-right">
                                            {Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 2 }).format(menu?.menu_amount || 0)}
                                            /{menu?.quantity_unit?.toLowerCase()}
                                        </span>
                                    </div>
                                    <p className="text-xs text-grey-dark-3 line-clamp-1">{menu.menu_content}</p>
                                </div>
                            </Link>
                        ))
                    }
                    </>
                ) : (
                    <div className="flex flex-col items-center w-full max-w-md text-center mx-auto py-12">
                        <div className="bg-orange-5 rounded-full grid place-content-center size-9 inset-ring-1 inset-ring-orange-2/50 mb-4">
                            <IconBowlFood className="size-4.5 text-orange-2" />
                        </div>
                        <span className="text-grey-dark-0 text-base font-semibold">Ready to start selling?</span>
                        <p className="text-grey-dark-2 text-sm font-normal">Add your first meal to create your menu and let customers discover what you cook best.</p>
                        <Button size="default" className="mt-4" asChild><Link href="/vendor/storefront/add">Add Meal</Link></Button>
                    </div>
                )
            }
        </div>
    )
}