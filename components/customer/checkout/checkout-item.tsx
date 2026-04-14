"use client";

import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { IconCalendar } from "@/components/icons";

type Props = {
    item: GetCartItemResponse;
}

export const CheckoutItem = ({ item }: Props) => {
    const [quantity, setQuantity] = useState(1)


    useEffect(() => {
        if (item.menu_id) {
            setQuantity(item.quantity_size)
        }
    }, [item.menu_id, item.quantity_size])
    
    return (
        <div className="flex items-center gap-4 rounded-lg bg-grey-dark-4 p-3">
            <Avatar className="size-16 rounded">
                <AvatarImage src={item.file_url} alt={item.menu_name} className="size-16 rounded" />
            </Avatar>
            <div className="grid gap-2">
                <span className="font-medium text-xs text-grey-dark-0">{item.menu_name}</span>
                <p className="text-xs text-grey-dark-3 line-clamp-1">{item.menu_content}</p>
                <div className="flex items-center px-2 gap-1 h-6 bg-white rounded-full w-fit">
                    <IconCalendar className="size-3 text-grey-dark-3" />
                    <span className="text-2xs text-grey-dark-2">{format(item.order_start_date, "do MMM, yyyy")}</span>
                    <span className="text-2xs text-orange-2">|</span>
                    <span className="text-2xs text-grey-dark-2">{format(item.order_start_date, "h:mmaaa")} - {format(item.order_end_date, "h:mmaaa")}</span>
                </div>
            </div>
            <div className="flex flex-col justify-between gap-8 w-fit h-full">
                <span className="font-semibold text-sm text-grey-dark-0 text-right">
                    {Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 2 }).format(item.order_amount)}
                </span>
                <span className="text-right text-xs font-medium text-grey-dark-0 whitespace-nowrap">
                    {quantity} {item?.quantity_unit.toLowerCase()}{quantity === 1 ? "" : "s"}
                </span>
            </div>
        </div>
    )
}