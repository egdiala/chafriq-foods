import { addDays, format, startOfWeek } from "date-fns";
import { IconDot } from "../icons";
import { useGetCook } from "@/services/queries/use-explore";
import { useMemo } from "react";
import { cn, formatTime } from "@/lib/utils";

type Props = {
    cookId: string;
}

export const StoreAvailability = ({ cookId }: Props) => {
    const start = startOfWeek(new Date(), { weekStartsOn: 1 });

    const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));
    const { data } = useGetCook({ cook_id: cookId, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone })

    const permanentSchedule = useMemo(() => {
        return data?.data?.schedule_data?.filter((item) => item.avail_type === 1) || []
    },[data?.data?.schedule_data])

    const temporarySchedule = useMemo(() => {
        return data?.data?.schedule_data?.filter((item) => item.avail_type === 2) || []
    },[data?.data?.schedule_data])
    return (
        <div className="flex flex-col gap-4 p-3 sm:p-5 rounded-2xl inset-ring-1 inset-ring-outline isolate h-fit">
            <div className="grid gap-2">
                <h2 className="font-semibold text-base text-grey-dark-0">Availability/Opening Hours</h2>
                <p className="text-xs text-grey-dark-3">Days & time cook is available to take orders. </p>
            </div>
            {
                days.map((day) => {
                    const actualDay = day.getDay() === 0 ? 7 : day.getDay()
                    const daySchedules = permanentSchedule?.filter((item) => item.day_week === actualDay) || []
                    const totalSchedules = daySchedules.length;

                    if (totalSchedules === 0) {
                        return null;
                    } else {
                        return (
                            <div key={day.toISOString()} className="flex flex-col p-4 gap-2 rounded-lg bg-grey-dark-4">
                                <div className="flex items-center justify-between">
                                    {format(day, "EEEE")}
                                </div>
                                <div className="space-y-3">
                                {
                                    daySchedules.map((daySchedule, index) => (
                                        <ScheduleRow
                                            key={index}
                                            daySchedule={daySchedule}
                                        />
                                    ))
                                }
                                </div>
                            </div>
                        )
                    }
                })
            }
            {
                temporarySchedule.map((day, index) => (
                    <div key={index} className="flex flex-col p-4 gap-2 rounded-lg bg-grey-dark-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-grey-dark-2">{format(day.day_date, "EE, PP")}</span>
                            <span className="text-right font-medium text-xs text-grey-dark-2">{formatTime(day.start_time)} - {formatTime(day.end_time)}</span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

type ScheduleRowProps = {
    daySchedule: GetCookResponse["schedule_data"][0]
}

const ScheduleRow = ({ daySchedule }: ScheduleRowProps) => {
    const isAvailable = daySchedule.status

    return (
        <div className="flex items-center justify-between">
            <span className="font-medium text-xs text-grey-dark-2">{formatTime(daySchedule.start_time)} - {formatTime(daySchedule.end_time)}</span>
            <div className="flex items-center justify-end gap-1">
                <div className={cn("flex items-center gap-1 text-xs h-3.5 px-1 w-fit rounded-full", isAvailable ? "bg-success-light text-success" : "bg-red-5 text-red-2")}>
                    <IconDot />
                    <span className="line-clamp-1">{isAvailable ? "Available" : "Unavailable"}</span>
                </div>
            </div>
        </div>
    )
}