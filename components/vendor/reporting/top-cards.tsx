"use client";

import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useReports } from "@/services/queries/use-reports";
import { IconCookingPot, IconCurrencyDollar, IconExternalLink, IconPackage, IconRepeat } from "@/components/icons";
import { Badge } from "@/components/ui/badge";

type Props = {
    className?: string;
}

export const TopCards = ({ className }: Props) => {
    const { data, isLoading } = useReports({ request_type: "1", timezone: Intl.DateTimeFormat().resolvedOptions().timeZone })
    const reportStats = data?.data as ReportsStatisticsResponse;

    const cards = useMemo(() => {
        return [
            {
                icon: <IconCookingPot />,
                title: "Total Orders",
                value: reportStats?.kpi?.total_orders,
                trend: reportStats?.kpi?.total_orders_change,
                asAgainst: "vs last 30 days"
            },
            {
                icon: <IconCurrencyDollar />,
                title: "Total Earnings",
                value: Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 2, minimumFractionDigits: 0 }).format(reportStats?.kpi?.total_earnings),
                trend: reportStats?.kpi?.total_earnings_change,
                asAgainst: "vs last month"
            },
            {
                icon: <IconPackage />,
                title: "Average Order Value",
                value: Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 2, minimumFractionDigits: 0 }).format(reportStats?.kpi?.avg_order_value),
                trend: reportStats?.kpi?.avg_order_value_change,
                asAgainst: "vs last month"
            },
            {
                icon: <IconRepeat />,
                title: "Repeat Customers",
                value: reportStats?.kpi?.repeat_customers,
                trend: reportStats?.kpi?.repeat_customers_change,
                asAgainst: "vs last month"
            },
        ]
    }, [reportStats?.kpi?.avg_order_value, reportStats?.kpi?.avg_order_value_change, reportStats?.kpi?.repeat_customers, reportStats?.kpi?.repeat_customers_change, reportStats?.kpi?.total_earnings, reportStats?.kpi?.total_earnings_change, reportStats?.kpi?.total_orders, reportStats?.kpi?.total_orders_change])
    
    return (
        <>
        {
            isLoading ? (
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
                {
                    Array.from({ length: 4 }).map((_, index) => (
                        <div key={index}>
                            <Skeleton className="h-27" />
                        </div>
                    ))
                }
                </div>
            ) : (!isLoading && data) ? (
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
                    {
                        cards.map((card, index) => (
                            <div key={index} className="flex flex-col gap-5 p-4 inset-ring-1 inset-ring-outline rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="grid place-content-center-safe size-8 bg-orange-5 text-orange-2 [&>svg]:size-4 rounded-xl">{card.icon}</div>
                                    <div className="grid gap-px">
                                        <span className="text-xs text-grey-dark-2">{card.title}</span>
                                        <p className="font-semibold text-sm text-grey-dark-2">{card.value}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 pl-10">
                                    <Badge variant="completed"><IconExternalLink /> {card.trend.toFixed(1)}%</Badge>
                                    <span className="text-xs text-grey-dark-3">{card.asAgainst}</span>
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