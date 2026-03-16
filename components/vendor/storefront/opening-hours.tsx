"use client";

import { useState } from "react";
import { Ellipsis, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { startOfWeek, addDays, format } from "date-fns";
import { SetDayAvailability } from "./set-day-availability";
import { IconDot } from "@/components/icons";

export const OpeningHours = () => {
    const [openDay, setOpenDay] = useState({ day: "", isOpen: false })
    const start = startOfWeek(new Date(), { weekStartsOn: 1 });

    const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));
    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="grid gap-2">
                    <h2 className="font-semibold text-base text-grey-dark-0">Availability/Opening Hours</h2>
                    <p className="text-xs text-grey-dark-3">Manage the days & time you are available to take orders. You can only set a maximum of 2 time slots per day</p>
                </div>
                <div className="grid gap-3">
                {
                    days.map((day) => (
                        <div key={day.toISOString()} className="flex flex-col p-4 gap-2 rounded-lg bg-grey-dark-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                    {format(day, "EEEE")}
                                    <Button variant="tertiary" size="icon-xs" type="button" onClick={() => setOpenDay({ day: format(day, "EEEE"), isOpen: true })}>
                                        <Plus className="size-4!" />
                                    </Button>
                                </div>
                                <Switch />
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-xs text-grey-dark-2">08:00am - 10:00am</span>
                                    <div className="flex items-center justify-end gap-1">
                                        <div className="flex items-center gap-1 bg-success-light text-xs text-success h-3.5 px-1 w-fit rounded-full">
                                            <IconDot />
                                            <span className="line-clamp-1">Available</span>
                                        </div>
                                        <Ellipsis className="size-4 text-grey-dark-3" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
                </div>
            </div>
            <SetDayAvailability day={openDay.day} open={openDay.isOpen} setOpen={setOpenDay} />
        </>
    )
}