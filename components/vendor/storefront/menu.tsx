"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ViewCuisineDrawer } from "./view-cuisine-drawer";
import { CuisineCard } from "@/components/explore-cuisines/cuisine-card";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { useState } from "react";

type Props = {
    className?: string;
}

export const Menu = ({ className }: Props) => {
    const [open, setOpen] = useState(false)
    return (
        <>
        <Card className={cn("py-0 sm:py-5 ring-0 sm:ring-1 overflow-visible", className)}>
            <CardHeader className="px-0 sm:px-5">
                <div className="flex items-center justify-between">
                    <CardTitle>Menu (23)</CardTitle>
                    <Button variant="secondary" size="small" className="text-sm font-medium" asChild>
                        <Link href="/vendor/storefront/add">
                            <Plus className="size-4!" />
                            <span className="sr-only sm:not-sr-only">Add New Cuisine</span>
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="px-0 sm:px-5">
                <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
                {
                    Array.from({ length: 7 }).map((_, index) => (
                        <div key={index} onClick={() => setOpen(true)}>
                            <CuisineCard />
                        </div>
                    ))
                }
                </div>
            </CardContent>
        </Card>
        <ViewCuisineDrawer open={open} setOpen={setOpen} />
        </>
    )
}