import { addDays, format, startOfWeek } from "date-fns";
import { IconDot } from "../icons";

export const StoreAvailability = () => {
    const start = startOfWeek(new Date(), { weekStartsOn: 1 });

    const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));
    return (
        <div className="flex flex-col gap-4 p-3 sm:p-5 rounded-2xl inset-ring-1 inset-ring-outline isolate h-fit">
            <div className="grid gap-2">
                <h2 className="font-semibold text-base text-grey-dark-0">Availability/Opening Hours</h2>
                <p className="text-xs text-grey-dark-3">Days & time cook is available to take orders. </p>
            </div>
                {
                    days.slice(0,3).map((day) => (
                        <div key={day.toISOString()} className="flex flex-col p-4 gap-2 rounded-lg bg-grey-dark-4">
                            <div className="flex items-center justify-between">
                                {format(day, "EEEE")}
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-xs text-grey-dark-2">08:00am - 10:00am</span>
                                    <div className="flex items-center justify-end gap-1">
                                        <div className="flex items-center gap-1 bg-success-light text-xs text-success h-3.5 px-1 w-fit rounded-full">
                                            <IconDot />
                                            <span className="line-clamp-1">Available</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-xs text-grey-dark-2">12:00pm - 15:00pm</span>
                                    <div className="flex items-center justify-end gap-1">
                                        <div className="flex items-center gap-1 bg-success-light text-xs text-success h-3.5 px-1 w-fit rounded-full">
                                            <IconDot />
                                            <span className="line-clamp-1">Available</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
                {
                    days.slice(0,2).map((day) => (
                        <div key={day.toISOString()} className="flex flex-col p-4 gap-2 rounded-lg bg-grey-dark-4">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-grey-dark-2">{format(day, "EE, PP")}</span>
                                <span className="text-right font-medium text-xs text-grey-dark-2">12:00pm - 15:00pm</span>
                            </div>
                        </div>
                    ))
                }
        </div>
    )
}