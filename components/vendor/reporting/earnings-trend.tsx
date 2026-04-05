"use client"

import { cn } from "@/lib/utils"
import { getYear } from "date-fns"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { IconFilter } from "@/components/icons"
import { Skeleton } from "@/components/ui/skeleton"
import { useReports } from "@/services/queries/use-reports"
import { buildEarningsData, generateYears } from "@/lib/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

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

export const EarningsTrendChart = ({ className }: Props) => {
    const [selectedYear, setSelectedYear] = useState(getYear(new Date()));
    const { data, isLoading } = useReports({ request_type: "3", timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, year: selectedYear.toString() })

    const chartData = useMemo(() => {
        return buildEarningsData((data?.data as ReportsStatisticsResponse)?.earnings_trend || [])
    },[data?.data])

    if (isLoading) {
        return (
            <Skeleton className={cn("grid min-h-56", className)} />
        )
    }
    return (
        <Card className={cn("py-4", className)}>
            <CardHeader className="px-4">
                <div className="flex items-center justify-between">
                    <CardTitle>Earnings Trend</CardTitle>
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
            <CardContent className="px-4">
                <ChartContainer config={chartConfig} className="w-full max-h-67.5">
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                    >
                        <CartesianGrid vertical={false} />
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
                        <Bar
                            dataKey="total_count"
                            name="Total earnings"
                            fill="var(--color-desktop)"
                            radius={0}
                            barSize={4}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}