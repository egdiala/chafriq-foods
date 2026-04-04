"use client"

import { IconFilter } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { generateYears } from "@/lib/chart";
import { cn } from "@/lib/utils";
import { useReports } from "@/services/queries/use-reports";
import { getYear } from "date-fns";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Pie, PieChart } from "recharts";

const years = generateYears(2000);

type Props = {
    className?: string;
}


const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Completed",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Cancelled",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export const OrderFulfillmentRate = ({ className }: Props) => {
    const [selectedYear, setSelectedYear] = useState(getYear(new Date()));
    const { data, isLoading } = useReports({ request_type: "5", timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, year: selectedYear.toString() })

    const chartData = useMemo(() => {
        return [
            { browser: "completed", visitors: (data?.data as ReportsStatisticsResponse)?.fulfillment?.completed || 0, fill: "var(--color-chrome)" },
            { browser: "cancelled", visitors: (data?.data as ReportsStatisticsResponse)?.fulfillment?.cancelled || 0, fill: "var(--color-safari)" },
        ]
    },[data?.data])

    if (isLoading) {
        return (
            <Skeleton className={cn("h-56", className)} />
        )
    }
    
    return (
        <Card className={cn("py-4", className)}>
            <CardHeader className="px-4">
                <div className="flex items-center justify-between">
                    <CardTitle>Order Fulfillment Rate</CardTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon-sm">
                                <IconFilter />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="min-w-20 max-h-69 bg-white" align="end">
                            {years.map((year) => (
                            <DropdownMenuItem
                                key={year}
                                onClick={() => setSelectedYear(year)}
                                className={cn(selectedYear === year ? "bg-accent font-medium" : "")}
                            >
                                {year}
                            </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="flex items-center gap-8 px-4">
                <div className="flex-1">
                    <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square max-h-[250px]"
                    >
                        <PieChart>
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Pie
                                data={chartData}
                                dataKey="visitors"
                                nameKey="browser"
                                innerRadius="90%"
                                cornerRadius="50%"
                                outerRadius="100%"
                                paddingAngle={6}
                            />
                        </PieChart>
                    </ChartContainer>
                </div>
                <div className="flex flex-col gap-8 flex-1">
                    <div>
                        <div className="flex items-center gap-1 text-xs text-grey-dark-2">
                            <span className="size-1.5 bg-(--color-chart-1) shrink-0 rounded-xs" />
                            Completed Orders
                        </div>
                        <p className="text-sm text-grey-dark-0 font-geist-sans">{(data?.data as ReportsStatisticsResponse)?.fulfillment?.completed_pct}%</p>
                    </div>
                    <div>
                        <div className="flex items-center gap-1 text-xs text-grey-dark-2">
                            <span className="size-1.5 bg-(--color-chart-2) shrink-0 rounded-xs" />
                            Cancelled Orders
                        </div>
                        <p className="text-sm text-grey-dark-0 font-geist-sans">{(data?.data as ReportsStatisticsResponse)?.fulfillment?.cancelled_pct}%</p>
                    </div>
                </div>
            </CardContent>
        </Card>

    )
}