import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTitle, DialogDescription, DialogHeader, DialogContent, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { useDeleteAvailability } from "@/services/mutations/use-schedules";
import { Spinner } from "@/components/ui/spinner";

type Props = {
    open: boolean;
    schedule: GetSchedulesResponse["data"][0];
    setOpen: ({ schedule, isOpen }: { schedule: GetSchedulesResponse["data"][0]; isOpen: boolean; }) => void;
}

export const DeleteSchedule = ({ open, schedule, setOpen }: Props) => {
    const closeDialog = (v: boolean) => {
        setOpen({ schedule: undefined as unknown as GetSchedulesResponse["data"][0], isOpen: v })
    }

    const { mutate, isPending } = useDeleteAvailability(() => closeDialog(false))
    return (
        <Dialog open={open} onOpenChange={closeDialog}>
            <DialogContent className="gap-5 sm:max-w-98.5" showCloseButton={false}>
                <div className="relative size-14">
                    <Image src="/caution.gif" alt="caution" fill />
                </div>
                <DialogHeader>
                    <DialogTitle className="font-semibold text-base">Delete schedule?</DialogTitle>
                    <DialogDescription>
                        This action would remove schedule and is irreversible.
                    </DialogDescription>
                </DialogHeader> 
                <DialogFooter className="flex-row sm:justify-start [&>button]:flex-1">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button type="button" onClick={() => mutate(schedule.schedule_id)}>Delete {(isPending) && (<Spinner className="absolute right-4 size-5" />)}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}