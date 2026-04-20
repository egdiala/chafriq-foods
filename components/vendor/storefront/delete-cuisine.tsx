import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useDeleteMenu } from "@/services/mutations/use-menu";
import { Dialog, DialogTitle, DialogDescription, DialogHeader, DialogContent, DialogFooter, DialogClose } from "@/components/ui/dialog";

type Props = {
    open: boolean;
    cuisine: GetMenuResponse | null;
    setOpen: ({ cuisine, isOpen }: { cuisine: GetMenuResponse | null; isOpen: boolean; }) => void;
}

export const DeleteCuisine = ({ open, cuisine, setOpen }: Props) => {
    const closeDialog = (v: boolean) => {
        setOpen({ cuisine: null as unknown as GetMenuResponse, isOpen: v })
    }

    const { mutate, isPending } = useDeleteMenu(() => closeDialog(false))
    return (
        <Dialog open={open} onOpenChange={closeDialog}>
            <DialogContent className="gap-5 sm:max-w-98.5" showCloseButton={false}>
                <div className="relative size-14">
                    <Image src="/caution.gif" alt="caution" fill />
                </div>
                <DialogHeader>
                    <DialogTitle className="font-semibold text-base">Delete meal?</DialogTitle>
                    <DialogDescription>
                        This action would remove {cuisine?.menu_name} and is irreversible.
                    </DialogDescription>
                </DialogHeader> 
                <DialogFooter className="flex-row sm:justify-start [&>button]:flex-1">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button type="button" onClick={() => mutate(cuisine?.menu_id || "")}>Delete {(isPending) && (<Spinner className="absolute right-4 size-5" />)}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}