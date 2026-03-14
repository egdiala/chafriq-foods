import { cn } from "@/lib/utils";
import { OpeningHours } from "./opening-hours";
import { TemporarySchedule } from "./temporary-schedule";

type Props = {
    className?: string;
}

export const AvailabilityCard = ({ className }: Props) => {
    return (
        <div className={cn("flex flex-col gap-9 p-5 inset-ring-1 inset-ring-outline rounded-2xl", className)}>
            <OpeningHours />
            <TemporarySchedule />
        </div>
    )
}