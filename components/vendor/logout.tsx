import Image from "next/image";
import { Button } from "../ui/button"
import { Dialog, DialogTitle, DialogDescription, DialogHeader, DialogContent, DialogFooter, DialogClose } from "../ui/dialog"

type Props = {
    open: boolean;
    setOpen: (v: boolean) => void;
}

export const Logout = ({ open, setOpen }: Props) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="gap-5 sm:max-w-98.5" showCloseButton={false}>
                <div className="relative size-14">
                    <Image src="/question-mark.gif" alt="question-mark" fill />
                </div>
                <DialogHeader>
                    <DialogTitle className="font-semibold text-base">Log out?</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to logout from this platform.
                    </DialogDescription>
                </DialogHeader> 
                <DialogFooter className="flex-row sm:justify-start [&>button]:flex-1">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button type="button">Logout</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}