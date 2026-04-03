"use client";

import { cn } from "@/lib/utils";
import { IconCookingPot, IconShoppingCart } from "@/components/icons";
import { useGetOrders } from "@/services/queries/use-orders";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";

type Props = {
    className?: string;
}

export const TopCards = ({ className }: Props) => {
    const { data, isLoading } = useGetOrders({ component: "count-status" })
    const cards = useMemo(() => {
        return [
            {
                icon: <IconShoppingCart />,
                title: "Total Orders",
                value: (data?.data as GetOrderStatusCountResponse)?.total_count
            },
            {
                icon: <IconCookingPot />,
                title: "New",
                value: (data?.data as GetOrderStatusCountResponse)?.total_new
            },
            {
                icon: <IconCookingPot />,
                title: "Completed",
                value: (data?.data as GetOrderStatusCountResponse)?.total_completed
            },
            {
                icon: <IconCookingPot />,
                title: "Cancelled",
                value: (data?.data as GetOrderStatusCountResponse)?.total_canceled
            },
            {
                icon: <IconCookingPot />,
                title: "Ongoing",
                value: (data?.data as GetOrderStatusCountResponse)?.total_ongoing
            }
        ]
    }, [data?.data])
    
    return (
        <>
        {
            isLoading ? (
                <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,420px))]">
                {
                    Array.from({ length: 6 }).map((_, index) => (
                        <div key={index}>
                            <Skeleton className="h-17" />
                        </div>
                    ))
                }
                </div>
            ) : (!isLoading && data && (data?.data as GetOrderStatusCountResponse)) ? (
                <div className={cn("grid gap-4", className)} style={{ gridTemplateColumns: "repeat(auto-fill, minmax(164px, 1fr))" }}>
                    {
                        cards.map((card, index) => (
                            <div key={index} className="flex items-center gap-3 p-4 inset-ring-1 inset-ring-outline rounded-xl">
                                <div className="grid place-content-center-safe size-8 bg-orange-5 text-orange-2 [&>svg]:size-4 rounded-xl">{card.icon}</div>
                                <div className="grid gap-px">
                                    <span className="text-xs text-grey-dark-2">{card.title}</span>
                                    <p className="font-semibold text-sm text-grey-dark-2">{card.value}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            ) : (
                null
            )
        }
        </>
    )
}