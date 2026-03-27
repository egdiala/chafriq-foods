"use client";

import { useState } from "react";
import { Ellipsis, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteSchedule } from "./delete-schedule";
import { startOfWeek, addDays, format } from "date-fns";
import { SetTemporarySchedule } from "./set-temporary-schedule";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { IconPencilSimple, IconToggleLeft, IconTrashSimple } from "@/components/icons";

type Props = {
    schedules: GetSchedulesResponse[];
}

export const TemporarySchedule = ({ schedules }: Props) => {
    const [openSchedule, setOpenSchedule] = useState(false)
    const [openDelete, setOpenDelete] = useState({ id: "", isOpen: false })
    const start = startOfWeek(new Date(), { weekStartsOn: 1 });

    const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));
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
                    days.map((day) => (
                        <div key={day.toISOString()} className="flex flex-col p-4 gap-2 rounded-lg bg-grey-dark-4">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-grey-dark-2">{format(day, "EE, PP")}</span>
                                <div className="flex items-center justify-end gap-3">
                                    <span className="text-right font-medium text-xs text-grey-dark-2">12:00pm - 15:00pm</span>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="tertiary" size="icon-xs">
                                                <Ellipsis className="size-4" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent align="end" className="w-28 p-2">
                                            <div className="flex items-center gap-3">
                                                <Button variant="secondary" size="icon-xs" type="button">
                                                    <IconToggleLeft />
                                                </Button>
                                                <Button variant="secondary" size="icon-xs" type="button">
                                                    <IconPencilSimple />
                                                </Button>
                                                <Button variant="secondary" size="icon-xs" type="button" onClick={() => setOpenDelete({ id: "", isOpen: true })}>
                                                    <IconTrashSimple />
                                                </Button>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                        </div>
                    ))
                }
                </div>
            </div>
            <DeleteSchedule open={openDelete.isOpen} setOpen={setOpenDelete} />
            <SetTemporarySchedule open={openSchedule} setOpen={setOpenSchedule} />
        </>
    )
}