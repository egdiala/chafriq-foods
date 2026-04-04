"use client"

import { IconExternalLink, IconFilter } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { generateYears } from "@/lib/chart";
import { cn, formatHours } from "@/lib/utils";
import { useReports } from "@/services/queries/use-reports";
import { getYear } from "date-fns";
import { useState } from "react";

const years = generateYears(2000);

type Props = {
    className?: string;
}

export const AveragePrepTime = ({ className }: Props) => {
    const [selectedYear, setSelectedYear] = useState(getYear(new Date()));
    const { data, isLoading } = useReports({ request_type: "6", timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, year: selectedYear.toString() })

    if (isLoading) {
        return (
            <Skeleton className={cn("h-56", className)} />
        )
    }
    
    return (
        <Card className={cn("py-4", className)}>
            <CardHeader className="px-4">
                <div className="flex items-center justify-between">
                    <CardTitle>Average Prep Time</CardTitle>
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
            <CardContent className="px-4 flex flex-col flex-1">
                <div className="flex flex-col flex-1">
                    <span className="text-6xl">{formatHours((data?.data as ReportsStatisticsResponse)?.avg_prep_time?.minutes/60)}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Badge variant="completed"><IconExternalLink /> {(data?.data as ReportsStatisticsResponse)?.avg_prep_time?.change_pct.toFixed(1)}%</Badge>
                    <span className="text-xs text-grey-dark-3">vs last month</span>
                </div>
            </CardContent>
        </Card>

    )
}