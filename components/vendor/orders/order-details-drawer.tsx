import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IconHourglass } from "@/components/icons/icon-hourglass";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconBowlFood, IconCalendar, IconClockCountdown, IconCoins, IconCurrencyDollar, IconExternalLink } from "@/components/icons";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";

type Props = {
    open: boolean;
    setOpen: (value: boolean) => void;
    onDispatched: (value: boolean) => void;
}

export const OrderDetailsDrawer = ({ onDispatched, open, setOpen }: Props) => {
    const viewportRef = useRef<HTMLDivElement | null>(null)
    const [isBottomVisible, setIsBottomVisible] = useState(true);
    
    useEffect(() => {
        const el = viewportRef.current;
        if (!el) return;
        
        const handleScroll = () => {
            setIsBottomVisible(
            el.scrollHeight - el.scrollTop - el.clientHeight < 2
            );
        };
        
        el.addEventListener("scroll", handleScroll);
        // Check on mount in case content is already scrolled
        handleScroll();
        
        return () => {
            el.removeEventListener("scroll", handleScroll);
        };
    }, [viewportRef]);
    return (
        <Drawer direction="right" open={open} onOpenChange={setOpen}>
            <DrawerContent>
                <div className="relative h-34 w-full rounded-t overflow-hidden">
                    <DrawerClose asChild>
                        <button type="button" className="absolute top-3.5 right-3.5 size-8 grid place-content-center rounded-full bg-white text-grey-dark-3">
                            <XIcon />
                        </button>
                    </DrawerClose>
                    <img src="https://images.unsplash.com/photo-1432139555190-58524dae6a55?q=80&w=2676&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="food" className="object-cover size-full" />
                </div>
                <ScrollArea viewportRef={viewportRef} className={cn("relative overscroll-contain flex-1 h-[calc(70vh-246px)]", !isBottomVisible ? "mask-alpha mask-b-from-75% mask-b-from-[#FF0000] mask-b-to-100% mask-b-to-[#FF0000]/0" : "")}>
                    <div className="relative flex flex-col flex-1 px-5 gap-5">
                        <DrawerHeader className="px-0 pb-0">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-grey-dark-3">Today, 9am</span>
                                <Badge variant="pending">PENDING</Badge>
                            </div>
                            <DrawerTitle className="font-semibold text-base text-grey-dark-0">Jollof Rice & Plantain</DrawerTitle>
                            <DrawerDescription className="text-xs text-grey-dark-3">1 Jollof Rice, 1 Fried Chicken, 2 Beef Skewers, and 1 Plantain. </DrawerDescription>
                        </DrawerHeader>

                        <div className="flex flex-col p-3 gap-3 bg-grey-dark-4 rounded-xl">
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-1 text-xs text-grey-dark-2 [&>svg]:text-orange-2 [&>svg]:size-3.5">
                                    <IconBowlFood /> Quantity
                                </span>
                                <span className="font-medium text-xs text-grey-dark-2">
                                    1 Plate
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-1 text-xs text-grey-dark-2 [&>svg]:text-orange-2 [&>svg]:size-3.5">
                                    <IconClockCountdown /> Turn around time
                                </span>
                                <span className="font-medium text-xs text-grey-dark-2">
                                    2hrs
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-1 text-xs text-grey-dark-2 [&>svg]:text-orange-2 [&>svg]:size-3.5">
                                    <IconCalendar /> Pickup Date
                                </span>
                                <span className="font-medium text-xs text-grey-dark-2">
                                    23rd Feb, 2024
                                </span>
                            </div>
                        </div>
                        
                        <div className="flex flex-col p-3 gap-2 bg-grey-dark-4 rounded-xl">
                            <span className="text-xs text-grey-dark-3 uppercase">Customer Note</span>
                            <p className="text-xs text-grey-dark-2">Please make sure the steak is cooked medium-rare and add a side of garlic mashed potatoes. Also, I would love a fresh garden salad with the house dressing on the side. Thank you!</p>
                        </div>

                        <div className="flex items-center flex-wrap gap-5">
                            <div className="flex flex-col p-3 gap-2 bg-grey-dark-4 rounded-xl min-w-28 flex-1">
                                <div className="text-xs text-grey-dark-2 [&>svg]:text-orange-2 [&>svg]:size-3.5 grid gap-1">
                                    <IconCurrencyDollar />
                                    Order Amount
                                </div>
                                <p className="text-sm font-medium text-grey-dark-2">$34.34</p>
                            </div>
                            <div className="flex flex-col p-3 gap-2 bg-grey-dark-4 rounded-xl min-w-28 flex-1">
                                <div className="text-xs text-grey-dark-2 [&>svg]:text-orange-2 [&>svg]:size-3.5 grid gap-1">
                                    <IconCoins />
                                    Commission
                                </div>
                                <p className="text-sm font-medium text-grey-dark-2">$30</p>
                            </div>
                            <div className="flex flex-col p-3 gap-2 bg-grey-dark-4 rounded-xl min-w-28 flex-1">
                                <div className="text-xs text-grey-dark-2 [&>svg]:text-orange-2 [&>svg]:size-3.5 grid gap-1">
                                    <IconHourglass />
                                    Time left
                                </div>
                                <p className="text-sm font-medium text-grey-dark-2">23 mins</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <span className="font-medium text-xs text-grey-dark-3 uppercase">CUSTOMER INFO.</span>
                            <div className="flex p-3 gap-3 bg-grey-dark-4 rounded-xl">
                                <Avatar className="size-12.5">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-xs text-grey-dark-2">James Andrew</span>
                                        <IconExternalLink className="text-orange-2" />
                                    </div>
                                    <p className="text-xs text-grey-dark-2">4517 Washington Ave. Manchester, Kentucky 39495</p>
                                    <p className="text-xs text-grey-dark-3">112km away</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
                <DrawerFooter className="flex-row [&>button]:flex-1">
                    <DrawerClose asChild>
                        <Button variant="secondary">Go Back</Button>
                    </DrawerClose>
                    <Button type="button" onClick={() => onDispatched(true)}>Accept Order</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}