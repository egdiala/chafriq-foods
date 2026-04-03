import { cn, dateToRender, formatHours } from "@/lib/utils";
import { XIcon } from "lucide-react";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IconHourglass } from "@/components/icons/icon-hourglass";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconBowlFood, IconCalendar, IconClockCountdown, IconCoins, IconCurrencyDollar, IconExternalLink } from "@/components/icons";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { useGetOrder } from "@/services/queries/use-orders";
import { format } from "date-fns";
import { ORDER_STATUS, ORDER_STATUS_CLASSES } from "./order-card";
import { VariantProps } from "class-variance-authority";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
    orderId: string | null;
    setOpen: (value: boolean) => void;
    onDispatched: (value: boolean) => void;
}

export const OrderDetailsDrawer = ({ onDispatched, orderId, setOpen }: Props) => {
    const { data, isLoading } = useGetOrder(orderId || "")
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
        <Drawer direction="right" open={!!orderId} onOpenChange={setOpen}>
            <DrawerContent>
                {
                    (isLoading || !data) ? (
                        <Skeleton className="h-44" />
                    ) : (
                        <div className="relative h-44 w-full rounded-t overflow-hidden">
                            <DrawerClose asChild>
                                <button type="button" className="absolute top-3.5 right-3.5 size-8 grid place-content-center rounded-full bg-white text-grey-dark-3">
                                    <XIcon />
                                </button>
                            </DrawerClose>
                            <img src={data?.data?.menu_img} alt={data?.data?.menu_name} className="object-cover size-full" />
                        </div>
                    )
                }
                {
                    (isLoading || !data) ? (
                        <>
                            <DrawerTitle className="sr-only">{orderId}</DrawerTitle>
                            <Skeleton className="h-[calc(70vh-246px)]" />
                        </>
                    ) : (
                        <ScrollArea viewportRef={viewportRef} className={cn("relative overscroll-contain flex-1 h-[calc(70vh-246px)]", !isBottomVisible ? "mask-alpha mask-b-from-75% mask-b-from-[#FF0000] mask-b-to-100% mask-b-to-[#FF0000]/0" : "")}>
                            <div className="relative flex flex-col flex-1 px-5 gap-5">
                                <DrawerHeader className="px-0 pb-0">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-grey-dark-3">{dateToRender(data?.data?.createdAt as unknown as Date)}, {format(data?.data?.createdAt as unknown as Date, "hh:mmaaa")}</span>
                                        <Badge variant={ORDER_STATUS_CLASSES[data?.data?.order_status as keyof typeof ORDER_STATUS_CLASSES] as unknown as VariantProps<typeof badgeVariants>["variant"]} className="capitalize [&>svg]:size-1.5!">
                                            {ORDER_STATUS[data?.data?.order_status as keyof typeof ORDER_STATUS]}
                                        </Badge>
                                    </div>
                                    <DrawerTitle className="font-semibold text-base text-grey-dark-0">{data?.data?.menu_name}</DrawerTitle>
                                    <DrawerDescription className="text-xs text-grey-dark-3">{data?.data?.menu_content}</DrawerDescription>
                                </DrawerHeader>

                                <div className="flex flex-col p-3 gap-3 bg-grey-dark-4 rounded-xl">
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-1 text-xs text-grey-dark-2 [&>svg]:text-orange-2 [&>svg]:size-3.5">
                                            <IconBowlFood /> Quantity
                                        </span>
                                        <span className="font-medium text-xs text-grey-dark-2">
                                            {data?.data?.quantity_size} {data?.data?.quantity_unit}{data?.data?.quantity_size === 1 ? "" : "s"}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-1 text-xs text-grey-dark-2 [&>svg]:text-orange-2 [&>svg]:size-3.5">
                                            <IconClockCountdown /> Turn around time
                                        </span>
                                        <span className="font-medium text-xs text-grey-dark-2">
                                            {formatHours(data?.data?.cooking_hour)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-1 text-xs text-grey-dark-2 [&>svg]:text-orange-2 [&>svg]:size-3.5">
                                            <IconCalendar /> Pickup Date
                                        </span>
                                        <span className="font-medium text-xs text-grey-dark-2">
                                           {format(data?.data?.order_end_date, "do MMM, yyyy")}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col p-3 gap-2 bg-grey-dark-4 rounded-xl">
                                    <span className="text-xs text-grey-dark-3 uppercase">Customer Note</span>
                                    <p className="text-xs text-grey-dark-2">{data?.data?.pickup_note || "-"}</p>
                                </div>

                                <div className="flex items-center flex-wrap gap-5">
                                    <div className="flex flex-col p-3 gap-2 bg-grey-dark-4 rounded-xl min-w-28 flex-1">
                                        <div className="text-xs text-grey-dark-2 [&>svg]:text-orange-2 [&>svg]:size-3.5 grid gap-1">
                                            <IconCurrencyDollar />
                                            Order Amount
                                        </div>
                                        <p className="text-sm font-medium text-grey-dark-2">
                                            {Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 2, minimumFractionDigits: 0 }).format(data?.data?.amount_total)}
                                        </p>
                                    </div>
                                    <div className="flex flex-col p-3 gap-2 bg-grey-dark-4 rounded-xl min-w-28 flex-1">
                                        <div className="text-xs text-grey-dark-2 [&>svg]:text-orange-2 [&>svg]:size-3.5 grid gap-1">
                                            <IconCoins />
                                            Commission
                                        </div>
                                        <p className="text-sm font-medium text-grey-dark-2">$0</p>
                                    </div>
                                    <div className="flex flex-col p-3 gap-2 bg-grey-dark-4 rounded-xl min-w-28 flex-1">
                                        <div className="text-xs text-grey-dark-2 [&>svg]:text-orange-2 [&>svg]:size-3.5 grid gap-1">
                                            <IconHourglass />
                                            Time left
                                        </div>
                                        <p className="text-sm font-medium text-grey-dark-2">0 mins</p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <span className="font-medium text-xs text-grey-dark-3 uppercase">CUSTOMER INFO.</span>
                                    <div className="flex p-3 gap-3 bg-grey-dark-4 rounded-xl">
                                        <Avatar className="size-12.5">
                                            <AvatarImage src="" />
                                            <AvatarFallback>
                                                {data?.data?.receiver_name?.split(" ")?.[0]?.[0]}
                                                {data?.data?.receiver_name?.split(" ")?.[1]?.[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col justify-center space-y-1 flex-1">
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium text-xs text-grey-dark-2">{data?.data?.receiver_name}</span>
                                                <IconExternalLink className="text-orange-2" />
                                            </div>
                                            <a href={`tel:${data?.data?.receiver_phone}`} className="text-xs text-grey-dark-2">{data?.data?.receiver_phone}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollArea>
                    )
                }
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