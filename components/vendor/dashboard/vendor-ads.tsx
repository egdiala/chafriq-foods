"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useVendorAds } from "@/services/queries/use-ads"

export const VendorAds = () => {
    const { data, isLoading } = useVendorAds()
    return (
        <>
        {
            isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 lg:col-span-8">
                {
                    Array.from({ length: 2 }).map((_, index) => (
                        <div key={index}>
                            <Skeleton className="h-45" />
                        </div>
                    ))
                }
                </div>
            ) : (!isLoading && data && (data?.data.length > 0)) ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 lg:col-span-8">
                    {
                        data?.data?.map((ad) => (
                            <div key={ad._id} className="rounded-xl bg-grey-dark-4 h-45 relative w-full overflow-hidden aspect-video">
                                <img src={ad.file_link} className="object-cover h-full w-full" />
                            </div>
                        ))
                    }
                </div>
            ) : (
                null
            )
        }
        </>
    )
}