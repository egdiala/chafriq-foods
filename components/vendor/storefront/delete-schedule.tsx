import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTitle, DialogDescription, DialogHeader, DialogContent, DialogFooter, DialogClose } from "@/components/ui/dialog"

type Props = {
    open: boolean;
    setOpen: ({ id, isOpen }: { id: string; isOpen: boolean; }) => void;
}

export const DeleteSchedule = ({ open, setOpen }: Props) => {
    return (
        <Dialog open={open} onOpenChange={(isOpen) => setOpen({ id: "", isOpen })}>
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
                    <Button type="button">Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}