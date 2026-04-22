"use client";

import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { useIsMobile } from "@/hooks/use-mobile";
import { Skeleton } from "@/components/ui/skeleton";
import { useVendorAds } from "@/services/queries/use-ads"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export const VendorAds = () => {
    const isMobile = useIsMobile()
    const autoplay = useRef(Autoplay({ delay: 3000 }));
    const { data, isLoading } = useVendorAds(isMobile ? "mobile" : "web")
    
    return (
        <>
        {
            isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 lg:col-span-8">
                {
                    Array.from({ length: 1 }).map((_, index) => (
                        <div key={index}>
                            <Skeleton className="h-80" />
                        </div>
                    ))
                }
                </div>
            ) : (!isLoading && data && (data?.data.length > 0)) ? (
                <div className="relative w-full h-50 sm:h-37.5 overflow-hidden rounded-lg lg:col-span-8">
                    <Carousel 
                        opts={{ loop: true }} 
                        orientation="horizontal" 
                        plugins={[autoplay.current]}
                        onMouseEnter={() => autoplay.current.stop()} 
                        onMouseLeave={() => autoplay.current.play()}
                        className="group rounded-lg overflow-hidden w-full"
                    >
                        <CarouselContent className="h-50 sm:h-37.5">
                            {data?.data?.map((ad) => (
                            <CarouselItem key={ad._id}>
                                <img src={ad.file_link} alt={ad._id} className="object-cover object-center w-full h-full" />
                            </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="group-hover:start-4" />
                        <CarouselNext className="group-hover:end-4" />
                    </Carousel>
                </div>
            ) : (
                null
            )
        }
        </>
    )
}