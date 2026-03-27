"use client";

import { useState } from "react";
import { AlertTriangle, Ellipsis, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteSchedule } from "./delete-schedule";
import { format } from "date-fns";
import { SetTemporarySchedule } from "./set-temporary-schedule";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { IconCheckmark, IconPencilSimple, IconToggleLeft, IconTrashSimple } from "@/components/icons";
import { useToggleAvailabilityStatus } from "@/services/mutations/use-schedules";
import { formatTime } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { UpdateTemporarySchedule } from "./update-temporary-schedule";

type Props = {
    schedules: GetSchedulesResponse[];
}

export const TemporarySchedule = ({ schedules }: Props) => {
    const [openSchedule, setOpenSchedule] = useState(false)
    const [openDelete, setOpenDelete] = useState({ schedule: undefined as unknown as GetSchedulesResponse["data"][0], isOpen: false })
    const [openEditDay, setOpenEditDay] = useState({ schedule: undefined as unknown as GetSchedulesResponse["data"][0], isOpen: false })

    const schedulesFlatMap = schedules?.flatMap((singleSchedule) => singleSchedule.data)
    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold text-base text-grey-dark-0">Temporary Schedule</h2>
                        <Button type="button" variant="secondary" size="small" className="text-sm font-medium" onClick={() => setOpenSchedule(true)}>
                            <Plus className="size-4!" />
                            <span className="sr-only sm:not-sr-only">Add</span>
                        </Button>
                    </div>
                    <p className="text-xs text-grey-dark-3">Temporary schedules are one-off schedule outside your permanent regular schedule and they expire when the time elapses</p>
                </div>
                <div className="grid gap-3">
                {
                    schedulesFlatMap.map((day, index) => {
                        return (
                            <TemporaryScheduleRow
                                onEdit={setOpenEditDay}
                                onDelete={setOpenDelete}
                                daySchedule={day}
                                key={index}
                            />
                        )
                    })
                }
                </div>
            </div>
            <DeleteSchedule open={openDelete.isOpen} setOpen={setOpenDelete} schedule={openDelete.schedule} />
            <SetTemporarySchedule open={openSchedule} setOpen={setOpenSchedule} />
            <UpdateTemporarySchedule open={openEditDay.isOpen} setOpen={setOpenEditDay} schedule={openEditDay.schedule} />
        </>
    )
}

type TemporaryScheduleRowProps = {
    daySchedule: GetSchedulesResponse["data"][0];
    onDelete: ({ schedule, isOpen }: { schedule: GetSchedulesResponse["data"][0]; isOpen: boolean; }) => void;
    onEdit: ({ schedule, isOpen }: { schedule: GetSchedulesResponse["data"][0]; isOpen: boolean; }) => void;
}

const TemporaryScheduleRow = ({ daySchedule, onEdit, onDelete }: TemporaryScheduleRowProps) => {
    const isAvailable = daySchedule.status
    const { mutate, isPending } = useToggleAvailabilityStatus()
    return (
        <div className="flex flex-col p-4 gap-2 rounded-lg bg-grey-dark-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-xs text-grey-dark-2">{format(daySchedule.day_date, "EE, PP")}</span>
                    {isAvailable ? <IconCheckmark className="size-3.5 text-success" /> : <AlertTriangle className="size-3.5 text-red-2" />}
                </div>
                <div className="flex items-center justify-end gap-3">
                    <span className="text-right font-medium text-xs text-grey-dark-2">{formatTime(daySchedule.start_time)} - {formatTime(daySchedule.end_time)}</span>
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
                                    isOpen: true, schedule: daySchedule
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
        </div>
    )
}