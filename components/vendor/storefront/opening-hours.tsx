"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Ellipsis, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Spinner } from "@/components/ui/spinner";
import { DeleteSchedule } from "./delete-schedule";
import { startOfWeek, addDays, format } from "date-fns";
import { SetDayAvailability } from "./set-day-availability";
import { UpdateDayAvailability } from "./update-day-availability";
import { useToggleAvailabilityStatus } from "@/services/mutations/use-schedules";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { IconDot, IconPencilSimple, IconToggleLeft, IconTrashSimple } from "@/components/icons";

type Props = {
    schedules: GetSchedulesResponse[];
}

export const OpeningHours = ({ schedules }: Props) => {
    const { mutate } = useToggleAvailabilityStatus()
    
    const [openDelete, setOpenDelete] = useState({ schedule: undefined as unknown as GetSchedulesResponse["data"][0], isOpen: false })
    const [openDay, setOpenDay] = useState({ day: undefined as unknown as Date, isOpen: false })
    const [openEditDay, setOpenEditDay] = useState({ day: undefined as unknown as Date, schedule: undefined as unknown as GetSchedulesResponse["data"][0], isOpen: false })
    const start = startOfWeek(new Date(), { weekStartsOn: 1 });

    const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));

    const schedulesFlatMap = schedules?.flatMap((singleSchedule) => singleSchedule.data)

    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="grid gap-2">
                    <h2 className="font-semibold text-base text-grey-dark-0">Availability/Opening Hours</h2>
                    <p className="text-xs text-grey-dark-3">Manage the days & time you are available to take orders. You can only set a maximum of 2 time slots per day</p>
                </div>
                <div className="grid gap-3">
                {
                    days.map((day) => {
                        const actualDay = day.getDay() === 0 ? 7 : day.getDay()
                        const daySchedules = schedulesFlatMap?.filter((item) => item.day_week === actualDay) || []
                        const totalSchedules = daySchedules.length;
                        const isAvailable = daySchedules.some((item) => item.status)

                        return (
                            <div key={day.toISOString()} className="flex flex-col p-4 gap-2 rounded-lg bg-grey-dark-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        {format(day, "EEEE")}
                                        {
                                            (totalSchedules < 2) && (
                                                <Button variant="tertiary" size="icon-xs" type="button" onClick={() => setOpenDay({ day: day, isOpen: true })}>
                                                    <Plus className="size-4!" />
                                                </Button>
                                            )
                                        }
                                    </div>
                                    {
                                        (totalSchedules > 0) && (
                                            <Switch checked={isAvailable} onCheckedChange={() => mutate({ id: actualDay.toString(), status: !isAvailable ? "1" : "0" })} />
                                        )
                                    }
                                </div>
                                {
                                    (totalSchedules > 0) && (
                                        <div className="space-y-3">
                                        {
                                            daySchedules.map((daySchedule) => (
                                                <ScheduleRow
                                                    day={day}
                                                    onEdit={setOpenEditDay}
                                                    onDelete={setOpenDelete}
                                                    daySchedule={daySchedule}
                                                    key={daySchedule.schedule_id}
                                                />
                                            ))
                                        }
                                        </div>
                                    )
                                }
                            </div>
                        )
                    })
                }
                </div>
            </div>
            <DeleteSchedule schedule={openDelete.schedule} open={openDelete.isOpen} setOpen={setOpenDelete} />
            <UpdateDayAvailability day={openEditDay.day} schedule={openEditDay.schedule} open={openEditDay.isOpen} setOpen={setOpenEditDay} />
            <SetDayAvailability day={openDay.day} open={openDay.isOpen} setOpen={setOpenDay} />
        </>
    )
}

type ScheduleRowProps = {
    day: Date;
    daySchedule: GetSchedulesResponse["data"][0];
    onDelete: ({ schedule, isOpen }: { schedule: GetSchedulesResponse["data"][0]; isOpen: boolean; }) => void;
    onEdit: ({ day, schedule, isOpen }: { day: Date; schedule: GetSchedulesResponse["data"][0]; isOpen: boolean; }) => void;
}

const ScheduleRow = ({ day, daySchedule, onEdit, onDelete }: ScheduleRowProps) => {
    const isAvailable = daySchedule.status
    const { mutate, isPending } = useToggleAvailabilityStatus()
    return (
        <div className="flex items-center justify-between">
            <span className="font-medium text-xs text-grey-dark-2">{daySchedule.start_time} - {daySchedule.end_time}</span>
            <div className="flex items-center justify-end gap-1">
                <div className={cn("flex items-center gap-1 text-xs h-3.5 px-1 w-fit rounded-full", isAvailable ? "bg-success-light text-success" : "bg-red-5 text-red-2")}>
                    <IconDot />
                    <span className="line-clamp-1">{isAvailable ? "Available" : "Unavailable"}</span>
                </div>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="tertiary" size="icon-xs">
                            <Ellipsis className="size-4" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-28 p-2">
                        <div className="flex items-center gap-3">
                            <Button variant="secondary" size="icon-xs" type="button" disabled={isPending} onClick={() => mutate({
                                id: daySchedule?.schedule_id, status: !daySchedule.status ? "1" : "0"
                            })}>
                                { isPending ? <Spinner className="size-4" /> : <IconToggleLeft />}
                            </Button>
                            <Button variant="secondary" size="icon-xs" type="button" onClick={() => onEdit({
                                day, isOpen: true, schedule: daySchedule
                            })}>
                                <IconPencilSimple />
                            </Button>
                            <Button variant="secondary" size="icon-xs" type="button" onClick={() => onDelete({ schedule: daySchedule, isOpen: true })}>
                                <IconTrashSimple />
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}