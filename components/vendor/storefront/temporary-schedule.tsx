
import { startOfWeek, addDays, format } from "date-fns";
import { Ellipsis } from "lucide-react";

export const TemporarySchedule = () => {
    const start = startOfWeek(new Date(), { weekStartsOn: 1 });

    const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));
    return (
        <div className="flex flex-col gap-4">
            <div className="grid gap-2">
                <h2 className="font-semibold text-base text-grey-dark-0">Temporary Schedule</h2>
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
                                <Ellipsis className="size-4 text-grey-dark-3" />
                            </div>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}