"use client"

import { IconFilter } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { generateYears } from "@/lib/chart";
import { cn } from "@/lib/utils";
import { useReports } from "@/services/queries/use-reports";
import { getYear } from "date-fns";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const years = generateYears(2000);

type Props = {
    className?: string;
}

export const TopSellingMeals = ({ className }: Props) => {
    const [animate, setAnimate] = useState(false);
    const [selectedYear, setSelectedYear] = useState(getYear(new Date()));
    const { data, isLoading } = useReports({ request_type: "4", timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, year: selectedYear.toString() })

    const totalMealsOrdered = useMemo(() => {
        return (data?.data as ReportsStatisticsResponse)?.top_meals?.reduce((sum, item) => sum + item.total_count, 0)
    }, [data?.data])

    useEffect(() => {
        if (data?.data) {
            setAnimate(false); // reset (important for year change)
            const t = setTimeout(() => setAnimate(true), 50);
            return () => clearTimeout(t);
        }
    }, [data?.data]);

    if (isLoading) {
        return (
            <Skeleton className={cn("h-56", className)} />
        )
    }
    
    return (
        <Card className={cn("py-4", className)}>
            <CardHeader className="px-4">
                <div className="flex items-center justify-between">
                    <CardTitle>Top Selling Meals</CardTitle>
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
                <div className="grid gap-2 content-start">
                {
                    (data?.data as ReportsStatisticsResponse)?.top_meals?.map((meal, index) => {
                        const percentage = totalMealsOrdered ? (meal.total_count / totalMealsOrdered) * 100 : 0;
                        return (
                            <Link key={meal.menu_id} href={`/vendor/storefront?menu_id=${meal.menu_id}`} className="flex items-center justify-between">
                                <div className="flex items-center gap-2 flex-1">
                                    <Avatar className="size-6 rounded-lg">
                                        <AvatarImage src={meal.file_url} className="size-6 rounded-lg" />
                                        <AvatarFallback>{meal.menu_name.split(" ")?.[0]?.[0]}{meal.menu_name.split(" ")?.[1]?.[0]}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs text-grey-dark-2">{meal.menu_name}</span>
                                </div>
                                <div className="flex items-center justify-end gap-2.5 flex-1">
                                    <div className="h-1 bg-input-field flex-1 rounded-full overflow-hidden">
                                        <div
                                            className="bg-orange-2 h-1 transition-[width] ease-linear duration-300"
                                            style={{ width: animate ? `${percentage}%` : "0%", transitionDelay: `${index * 80}ms` }}
                                        />
                                    </div>
                                    <span className="font-medium text-xs text-grey-dark-2">{meal.total_count}</span>
                                </div>
                            </Link>
                        )
                    })
                }
                </div>
            </CardContent>
        </Card>

    )
}