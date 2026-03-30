"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ViewCuisineDrawer } from "./view-cuisine-drawer";
import { CuisineCard } from "@/components/explore-cuisines/cuisine-card";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useGetMenuList } from "@/services/queries/use-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { IconBowlFood, IconTrashSimple } from "@/components/icons";
import { DeleteCuisine } from "./delete-cuisine";

type Props = {
    className?: string;
}

export const Menu = ({ className }: Props) => {
    const [open, setOpen] = useState({
        cuisine: null as GetMenuResponse | null,
        isOpen: false
    })
    const { data, isLoading } = useGetMenuList({})
    const [openDelete, setOpenDelete] = useState({
        cuisine: null as GetMenuResponse | null,
        isOpen: false
    })
    return (
        <>
        <Card className={cn("py-0 sm:py-5 ring-0 sm:ring-1 overflow-visible", className)}>
            <CardHeader className="px-0 sm:px-5">
                <div className="flex items-center justify-between">
                    <CardTitle>Menu ({data?.data?.length})</CardTitle>
                    <Button variant="secondary" size="small" className="text-sm font-medium" asChild>
                        <Link href="/vendor/storefront/add">
                            <Plus className="size-4!" />
                            <span className="sr-only sm:not-sr-only">Add New Cuisine</span>
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="px-0 sm:px-5">
            {
                isLoading ? (
                    <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
                    {
                        Array.from({ length: 6 }).map((_, index) => (
                            <div key={index}>
                                <Skeleton className="h-60" />
                            </div>
                        ))
                    }
                    </div>
                ) : (!isLoading && data && (data?.data.length > 0)) ? (
                    <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
                    {
                        data.data.map((menu) => (
                            <div key={menu.menu_id} className="relative">
                                <Button variant="carousel" size="icon-xs" className="absolute top-2.5 right-2.5 z-10" onClick={() => setOpenDelete({
                                    cuisine: menu,
                                    isOpen: true
                                })}>
                                    <IconTrashSimple className="text-red-2" />
                                </Button>
                                <CuisineCard cuisine={menu} onView={() => setOpen({
                                        cuisine: menu,
                                        isOpen: true
                                    })}
                                />
                            </div>
                        ))
                    }
                    </div>
                ) : (
                    <div className="flex flex-col items-center w-full max-w-md text-center mx-auto py-24">
                        <div className="bg-orange-5 rounded-full grid place-content-center size-9 inset-ring-1 inset-ring-orange-2/50 mb-4">
                            <IconBowlFood className="size-4.5 text-orange-2" />
                        </div>
                        <span className="text-grey-dark-0 text-base font-semibold">Ready to start selling?</span>
                        <p className="text-grey-dark-2 text-sm font-normal">Add your first cuisine to create your menu and let customers discover what you cook best.</p>
                    </div>
                )
            }
            </CardContent>
        </Card>
        <DeleteCuisine open={openDelete.isOpen} cuisine={openDelete.cuisine} setOpen={setOpenDelete} />
        <ViewCuisineDrawer open={open.isOpen} cuisine={open.cuisine} setOpen={setOpen} />
        </>
    )
}