"use client";

import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { useVendorAds } from "@/services/queries/use-ads"
import { useState } from "react";
import Autoplay from "embla-carousel-autoplay";

export const VendorAds = () => {
    const isMobile = useIsMobile()
    const [api, setApi] = useState<CarouselApi>()
    const { data, isLoading } = useVendorAds(isMobile ? "mobile" : "web")
    
    return (
        <>
        {
            isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 lg:col-span-8">
                {
                    Array.from({ length: 2 }).map((_, index) => (
                        <div key={index}>
                            <Skeleton className="h-80" />
                        </div>
                    ))
                }
                </div>
            ) : (!isLoading && data && (data?.data.length > 0)) ? (
                <div className="relative w-full h-auto sm:h-80 overflow-hidden rounded-lg lg:col-span-8">
                    <Carousel 
                        setApi={setApi} 
                        opts={{ loop: true }} 
                        orientation="horizontal" 
                        plugins={[Autoplay({ delay: 3000 })]}
                        className="group rounded-lg overflow-hidden w-full"
                        onMouseEnter={() => api?.plugins().autoplay?.stop()} 
                        onMouseLeave={() => api?.plugins().autoplay?.play()}
                    >
                        <CarouselContent className="h-auto sm:h-80">
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