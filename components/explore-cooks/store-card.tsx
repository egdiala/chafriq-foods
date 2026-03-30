"use client";

import { useGetCook } from "@/services/queries/use-explore";
import { IconCheckmark, IconMapPinLine, IconStarFull } from "../icons"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

type Props = {
    cookId: string;
}

export const StoreCard = ({ cookId }: Props) => {
    const { data } = useGetCook({ cook_id: cookId, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone })
    return (
        <div className="flex flex-col gap-3 p-3 sm:p-5 rounded-2xl inset-ring-1 inset-ring-outline isolate h-fit">
            <div className="flex items-start justify-between">
                <Avatar className="size-10 sm:size-24.5 outline-1 outline-white rounded-lg">
                    <AvatarImage src={data?.data?.business_logo} className="rounded-lg" />
                    <AvatarFallback>SD</AvatarFallback>
                </Avatar>
                <span className="text-xs text-grey-dark-3">Last pickup: 23 hrs ago</span>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm sm:text-base font-semibold text-grey-dark-0">{data?.data?.business_name}</h3>
                    <div className="flex items-center gap-1 bg-success-light text-xs text-success h-5 px-2 w-fit rounded-full">
                        <IconCheckmark />
                        <span className="line-clamp-1">ID Verified</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-grey-dark-2 [&>svg]:text-yellow-2">
                    <IconStarFull /> {data?.data?.rating.toFixed(1)}
                </div>
                <div className="flex items-start gap-1">
                    <IconMapPinLine className="text-orange-2 mt-1" />
                    <span className="text-sm text-grey-dark-2 flex-1">{data?.data?.business_address}</span>
                </div>
            </div>
        </div>
    )
}