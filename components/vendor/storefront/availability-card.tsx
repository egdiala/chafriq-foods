"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { OpeningHours } from "./opening-hours";
import { Skeleton } from "@/components/ui/skeleton";
import { TemporarySchedule } from "./temporary-schedule";
import { useGetAvailability } from "@/services/queries/use-schedules";

type Props = {
    className?: string;
}

export const AvailabilityCard = ({ className }: Props) => {
    const { data, isLoading } = useGetAvailability()
    
    const permanentSchedules = useMemo(() => {
        return data?.data?.filter((item) => item.avail_type === 1) || []
    }, [data?.data])
    
    const temporarySchedules = useMemo(() => {
        return data?.data?.filter((item) => item.avail_type === 2) || []
    }, [data?.data])

    return (
        <>
        {
            isLoading ? (
                <Skeleton className={cn("h-60! w-full", className)} />
            ) : (
                <div className={cn("flex flex-col sm:flex-row lg:flex-col gap-9 p-0 sm:p-5 sm:inset-ring-1 sm:inset-ring-outline sm:rounded-2xl", className)}>
                    <OpeningHours schedules={permanentSchedules} />
                    <TemporarySchedule schedules={temporarySchedules} />
                </div>
            )
        }
        </>
    )
}