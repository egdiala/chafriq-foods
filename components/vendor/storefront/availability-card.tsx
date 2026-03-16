import { cn } from "@/lib/utils";
import { OpeningHours } from "./opening-hours";
import { TemporarySchedule } from "./temporary-schedule";

type Props = {
    className?: string;
}

export const AvailabilityCard = ({ className }: Props) => {
    return (
        <div className={cn("flex flex-col sm:flex-row lg:flex-col gap-9 p-0 sm:p-5 sm:inset-ring-1 sm:inset-ring-outline sm:rounded-2xl", className)}>
            <OpeningHours />
            <TemporarySchedule />
        </div>
    )
}