"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { IconFilter } from "@/components/icons"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 73 },
  { month: "February", desktop: 73 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 186 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
  { month: "July", desktop: 186 },
  { month: "August", desktop: 214 },
  { month: "September", desktop: 209 },
  { month: "October", desktop: 305 },
  { month: "November", desktop: 237 },
  { month: "December", desktop: 305 },
]

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
    return (
        <Card className={cn("py-4", className)}>
            <CardHeader className="px-4">
                <div className="flex items-center justify-between">
                    <CardTitle>Order Trend</CardTitle>
                    <Button variant="secondary" size="icon-sm"><IconFilter /></Button>
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
                            dataKey="desktop"
                            type="natural"
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
