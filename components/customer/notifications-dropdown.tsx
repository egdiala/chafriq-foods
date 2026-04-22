
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useRef, useState } from "react";
import { IconBell, IconClose } from "../icons";
import { useGetCustomerNotifications } from "@/services/queries/use-notification";
import { Popover, PopoverClose, PopoverContent, PopoverHeader, PopoverTitle, PopoverTrigger } from "../ui/popover";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import { useReadCustomerNotification } from "@/services/mutations/use-notification";

export const CustomerNotificationsDropdown = () => {
    const { data, isLoading } = useGetCustomerNotifications()
    const viewportRef = useRef<HTMLDivElement | null>(null)
    const [isBottomVisible, setIsBottomVisible] = useState(true);

    const unreadMessages = (data?.data || [])?.filter((item) => item.status === 0)
    
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
        <>
        <Popover>
            <div className="relative">
                {
                    unreadMessages.length > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 z-1 text-xs font-medium text-white rounded-full bg-error p-px px-1.5">{unreadMessages.length}</span>
                    )
                }
                <PopoverTrigger asChild>
                    <Button type="button" size="icon-lg" variant="secondary">
                        <IconBell />
                    </Button>
                </PopoverTrigger>  
            </div>
            <PopoverContent className="p-0! w-100 origin-top-right gap-0 max-h-149.5" align="end" sideOffset={8}>
                <div className="flex items-center justify-between py-4 px-5 bg-input-field rounded-t-2xl">
                    <PopoverHeader>
                        <PopoverTitle className="flex items-center gap-1 font-semibold text-base text-grey-dark-0">Notifications <span className="text-xs font-medium text-white rounded-full bg-error p-px px-1.5">{unreadMessages.length}</span></PopoverTitle>
                    </PopoverHeader>
                    <div className="flex items-center justify-end gap-4">
                        <PopoverClose asChild>
                            <Button size="icon-sm" variant="carousel" className="bg-transparent"><IconClose /></Button>
                        </PopoverClose>
                    </div>
                </div>
                {
                    (isLoading || !data) ? (
                        <div className="grid gap-3 content-start px-5 pb-5 pt-4">
                            {
                                Array.from({ length: 4 }).map((_, index) => (
                                    <Skeleton key={index} className="h-22" />
                                ))
                            }
                        </div>
                    ) : (
                        <ScrollArea viewportRef={viewportRef} className={cn("relative overscroll-contain overflow-scroll flex-1 h-[calc(598px-64px)]", !isBottomVisible ? "mask-alpha mask-b-from-75% mask-b-from-[#FF0000] mask-b-to-100% mask-b-to-[#FF0000]/0" : "")}>
                            <div className="relative flex flex-col flex-1 px-5 pb-5 pt-4 gap-3">
                            {
                                data.data.map((notification) => (
                                    <NotificationRow key={notification.notification_id} {...notification} />
                                ))
                            }
                            </div>
                        </ScrollArea>
                    )
                }
            </PopoverContent>
        </Popover>
        </>
    )
}

const NotificationRow = ({ status, notification, notification_id }: GetVendorNotificationResponse) => {
    const { mutate, isPending } = useReadCustomerNotification()
    const isUnread = status === 0;
    return (
        <div className={cn("flex flex-col p-3 gap-2 rounded-lg", isUnread ? "bg-orange-5 cursor-pointer" : "bg-grey-dark-4", isPending ? "animate-pulse" : "")} onClick={() => isPending ? {} : mutate(notification_id)}>
            <div className="flex items-center justify-between">
                <span className="font-medium text-xs text-grey-dark-0">{notification.title}</span>
                {isUnread && (<div className="size-2 rounded-full bg-orange-2" />)}
            </div>
            <p className="font-normal text-xs text-grey-dark-2">{notification.body}</p>
        </div>
    )
}