"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { IconFilter } from "@/components/icons"
import { useReports } from "@/services/queries/use-reports"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"
import { useMemo, useState } from "react"
import { buildChartData, generateYears } from "@/lib/chart"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { getYear } from "date-fns"

const years = generateYears(2000);

const chartConfig = {
  desktop: {
    label: "Orders",
    color: "var(--color-orange-2)",
  },
} satisfies ChartConfig

type Props = {
    className?: string;
}

export const OrderTrendChart = ({ className }: Props) => {
    const [selectedYear, setSelectedYear] = useState(getYear(new Date()));
    const { data, isLoading } = useReports({ timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, year: selectedYear.toString() })

    const chartData = useMemo(() => {
        return buildChartData((data?.data as ReportsStatisticsResponse)?.order_trend || [])
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
                    <CardTitle>Order Trend</CardTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon-sm">
                                <IconFilter />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="min-w-20 max-h-96 bg-white" align="end">
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
            <CardContent className="px-4">
                <ChartContainer config={chartConfig} className="w-full max-h-56">
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                            top: 10
                        }}
                    >
                        <CartesianGrid horizontal={false} vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <defs>
                            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                offset="5%"
                                stopColor="var(--color-desktop)"
                                stopOpacity={0.8}
                                />
                                <stop
                                offset="95%"
                                stopColor="var(--color-desktop)"
                                stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <Area
                            dataKey="total_count"
                            name="Total count"
                            type="monotone"
                            fill="url(#fillDesktop)"
                            fillOpacity={0.13}
                            stroke="var(--color-desktop)"
                            strokeWidth={1.5}
                            activeDot={{
                                r: 4,
                                fill: "var(--color-orange-2)",
                                stroke: "var(--color-white)",
                                strokeWidth: 2,
                            }}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}