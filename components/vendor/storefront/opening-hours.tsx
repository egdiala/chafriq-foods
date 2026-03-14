import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { startOfWeek, addDays, format } from "date-fns";
import { Plus } from "lucide-react";

export const OpeningHours = () => {
    const start = startOfWeek(new Date(), { weekStartsOn: 1 });

    const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));
    return (
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
                                <Button variant="tertiary" size="icon-xs"><Plus className="size-4!" /></Button>
                            </div>
                            <Switch />
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}