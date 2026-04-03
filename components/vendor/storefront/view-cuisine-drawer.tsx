import Link from "next/link";
import { cn, formatHours } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { IconBowlFood, IconCalendar, IconClockCountdown, IconCoins, IconCurrencyDollar } from "@/components/icons";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { useGetSingleMenu } from "@/services/queries/use-menu";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
    menuId: string | null;
    setOpen: () => void;
}

export const ViewCuisineDrawer = ({ menuId, setOpen }: Props) => {
    const { data, isLoading } = useGetSingleMenu(menuId || "")
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
        <Drawer direction="right" open={!!menuId} onOpenChange={setOpen}>
            <DrawerContent>
                {
                    (isLoading || !data) ? (
                        <Skeleton className="h-44" />
                    ) : (
                        <div className="group relative h-44 w-full rounded-t overflow-hidden">
                            <Carousel opts={{ loop: true }} className="w-full h-full">
                                <CarouselContent>
                                    {(data?.data?.image_data || []).map((media, index) => (
                                    <CarouselItem key={index}>
                                        <div className="overflow-hidden aspect-video bg-orange-1">
                                        {
                                            media.mime_type.startsWith("image") ? (
                                                <img src={media?.file_url} alt={media.image_id} className="object-cover object-center w-full" />
                                            ): (
                                                <video
                                                    autoPlay
                                                    loop
                                                    muted
                                                    playsInline
                                                    preload="auto"
                                                    className="h-full w-full object-cover"
                                                >
                                                    <source src={media?.file_url} type={media.mime_type} />
                                                </video>
                                            )
                                        }
                                        </div>
                                    </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="group-hover:start-4" />
                                <CarouselNext className="group-hover:end-4" />
                            </Carousel>
                        </div>
                    )
                }
                {
                    (isLoading || !data) ? (
                        <>
                            <DrawerTitle className="sr-only">{menuId}</DrawerTitle>
                            <Skeleton className="h-[calc(70vh-246px)]" />
                        </>
                    ) : (
                        <ScrollArea viewportRef={viewportRef} className={cn("relative overscroll-contain flex-1 h-[calc(70vh-246px)]", !isBottomVisible ? "mask-alpha mask-b-from-75% mask-b-from-[#FF0000] mask-b-to-100% mask-b-to-[#FF0000]/0" : "")}>
                            <div className="relative flex flex-col flex-1 px-5 gap-5">
                                <DrawerHeader className="px-0 pb-0">
                                    <div className="flex items-center gap-3 w-full overflow-x-scroll">
                                    {
                                        (data?.data?.image_data || []).map((media, index) => (
                                            <div key={index} className="overflow-hidden w-13.5 h-11 rounded-lg bg-orange-1">
                                            {
                                                media.mime_type.startsWith("image") ? (
                                                    <img src={media.file_url} alt={media.image_id} className="object-cover object-center w-13.5 h-11" />
                                                ): (
                                                    <video
                                                        autoPlay
                                                        loop
                                                        muted
                                                        playsInline
                                                        preload="auto"
                                                        className="w-13.5 h-11 object-cover"
                                                    >
                                                        <source src={media?.file_url} type={media.mime_type} />
                                                    </video>
                                                )
                                            }
                                            </div>
                                        ))
                                    }
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
                                            {formatHours(data?.data?.cooking_hour || 0)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-1 text-xs text-grey-dark-2 [&>svg]:text-orange-2 [&>svg]:size-3.5">
                                            <IconCalendar /> Minimum order size
                                        </span>
                                        <span className="font-medium text-xs text-grey-dark-2">
                                            {data?.data?.min_order} {data?.data?.quantity_unit}{data?.data?.min_order === 1 ? "" : "s"}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col p-3 gap-2 bg-grey-dark-4 rounded-xl">
                                    <span className="text-xs text-grey-dark-3 uppercase">Additional Note</span>
                                    <p className="text-xs text-grey-dark-2">{data?.data?.additional_note}</p>
                                </div>

                                <div className="flex items-center flex-wrap gap-5">
                                    <div className="flex flex-col p-3 gap-2 bg-grey-dark-4 rounded-xl min-w-28 flex-1">
                                        <div className="text-xs text-grey-dark-2 [&>svg]:text-orange-2 [&>svg]:size-3.5 grid gap-1">
                                            <IconCurrencyDollar />
                                            Order Amount
                                        </div>
                                        <p className="text-sm font-medium text-grey-dark-2">
                                            {Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 2 }).format(data?.data?.menu_amount || 0)}
                                        </p>
                                    </div>
                                    <div className="flex flex-col p-3 gap-2 bg-grey-dark-4 rounded-xl min-w-28 flex-1">
                                        <div className="text-xs text-grey-dark-2 [&>svg]:text-orange-2 [&>svg]:size-3.5 grid gap-1">
                                            <IconCoins />
                                            Commission
                                        </div>
                                        <p className="text-sm font-medium text-grey-dark-2">$0</p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 inset-ring-1 inset-ring-outline p-3 rounded-lg">
                                    <span className="font-medium text-sm text-grey-dark-0">Allergy Information</span>
                                    <div className="grid gap-3">
                                        <span className="text-xs text-grey-dark-2">Allergens that are ingredients in this cuisine</span>
                                        <div className="flex items-center gap-x-4 gap-y-2 flex-wrap"> 
                                            {data?.data?.allegen_list?.map((item, i) => (
                                                <div key={i} className="capitalize active:scale-98 inline-flex text-xs rounded-full px-3 py-1 inset-ring-1 inset-ring-grey-dark-4 bg-grey-dark-4 text-grey-dark-2">
                                                    {item.name}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className="grid gap-3">
                                        <span className="text-xs text-grey-dark-2">May contain traces (cross-contamination possible)</span>
                                        <div className="flex items-center gap-x-4 gap-y-2 flex-wrap"> 
                                            {data?.data?.allegen_trace?.map((item, i) => (
                                                <div key={i} className="capitalize active:scale-98 inline-flex text-xs rounded-full px-3 py-1 inset-ring-1 inset-ring-grey-dark-4 bg-grey-dark-4 text-grey-dark-2">
                                                    {item.name}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className="grid gap-3">
                                        <span className="text-xs text-grey-dark-3">Allergy Notes</span>
                                        <p className="text-xs text-grey-dark-2"> 
                                            {data?.data?.allegen_note}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </ScrollArea>
                    )
                }
                <DrawerFooter className="flex-row [&>button]:flex-1 [&>a]:flex-1">
                    <DrawerClose asChild>
                        <Button variant="secondary">Go Back</Button>
                    </DrawerClose>
                    <Button asChild><Link href={`/vendor/storefront/edit/${menuId}`}>Edit Cuisine</Link></Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}