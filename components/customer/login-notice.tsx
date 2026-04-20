import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button"
import { usePathname } from "next/navigation";
import { Dialog, DialogTitle, DialogDescription, DialogHeader, DialogContent, DialogFooter, DialogClose } from "../ui/dialog";

type Props = {
    open: boolean;
    setOpen: (v: boolean) => void;
}

export const LoginNotice = ({ open, setOpen }: Props) => {
    const pathname = usePathname()
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="gap-5 sm:max-w-md" showCloseButton={false}>
                <div className="relative size-14">
                    <Image src="/caution.gif" alt="caution" fill />
                </div>
                <DialogHeader>
                    <DialogTitle className="font-bold text-base">Almost there!</DialogTitle>
                    <DialogDescription>
                        Log in to your account to add items to your cart and enjoy a seamless checkout.<br /> New here? <Link href={`/customer/register?routeTo=${pathname}`} className="text-sm!">Signup</Link> in seconds and start ordering.
                    </DialogDescription>
                </DialogHeader> 
                <DialogFooter className="flex-row sm:justify-start [&>button]:flex-1 [&>a]:flex-1">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button asChild>
                        <Link href={`/customer/login?routeTo=${pathname}`} className="text-sm!">Proceed to Login</Link>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}