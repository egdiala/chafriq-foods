"use client";

import { format } from "date-fns";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/context/use-cart";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAddToCart } from "@/services/mutations/use-orders";
import { IconArrowDown, IconCalendar } from "@/components/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Link from "next/link";

type Props = {
    item: GetCartItemResponse;
}

export const CartItem = ({ item }: Props) => {
    const [quantity, setQuantity] = useState(1)
    const { selectedCartItems, selectCartItem, deselectCartItem } = useCart()
    const { mutate, isPending, variables } = useAddToCart("Cart updated successfully")

    const increment = () => {
        if (isPending) return;
        mutate({
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            menu_id: item?.menu_id,
            quantity_size: (quantity + 1).toString(),
            order_date: item.order_date as unknown as string
        })
        setQuantity((qty) => qty + 1);
    }

    const decrease = () => {
        if ((quantity === (item.item_min_order || item.item_quantity_size)) || isPending) return;
        mutate({
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            menu_id: item?.menu_id,
            quantity_size: (quantity - 1).toString(),
            order_date: item.order_date as unknown as string
        })
        setQuantity((qty) => qty - 1);
    }

    useEffect(() => {
        if (item.menu_id) {
            setQuantity(item.quantity_size)
        }
    }, [item.menu_id, item.quantity_size])
    
    return (
        <div className="flex items-center gap-4 rounded-lg bg-grey-dark-4 p-3">
            <Checkbox
                id={item.menu_id}
                aria-label={`Select ${item.menu_name}`}
                checked={selectedCartItems.includes(item.menu_id)}
                onCheckedChange={(value) => value ? selectCartItem(item.menu_id) : deselectCartItem(item.menu_id)}
            />
            <Avatar className="size-16 rounded">
                <AvatarImage src={item.file_url} alt={item.menu_name} className="size-16 rounded" />
            </Avatar>
            <div className="grid gap-2">
                <Link href={`/meals/${item.menu_id}`} className="font-medium text-xs text-grey-dark-0 hover:underline">{item.menu_name}</Link>
                <p className="text-xs text-grey-dark-3 line-clamp-1">{item.menu_content}</p>
                <Popover>
                    <PopoverTrigger disabled={isPending && (variables.order_date !== item.order_date)} asChild>
                        <button type="button" className="flex items-center px-2 gap-1 h-6 bg-white rounded-full w-fit">
                            <IconCalendar className="size-3 text-grey-dark-3" />
                            <span className="text-2xs text-grey-dark-2">{format(item.order_start_date, "do MMM, yyyy")}</span>
                            <span className="text-2xs text-orange-2">|</span>
                            <span className="text-2xs text-grey-dark-2">{format(item.order_start_date, "h:mmaaa")} - {format(item.order_end_date, "h:mmaaa")}</span>
                            {(isPending && (variables.order_date !== item.order_date)) ? (
                                <Spinner className="size-4 text-grey-dark-3" />
                            ) : (
                                <IconArrowDown className="size-4 text-grey-dark-3" />
                            )}
                        </button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="p-1 w-65">
                        <Calendar
                            mode="single"
                            selected={item.order_date as unknown as Date}
                            onSelect={(pickedDate) => mutate({
                                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                                menu_id: item?.menu_id,
                                quantity_size: item.quantity_size.toString(),
                                order_date: pickedDate ? format(pickedDate as unknown as Date, "yyyy-MM-dd") : item.order_date as string
                            })}
                            defaultMonth={new Date(item.order_date)}
                            className="bg-transparent"
                            captionLayout="label"
                            disabled={(isPending && (variables.order_date !== item.order_date)) || { before: new Date() }}
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="flex flex-col justify-between gap-8 w-fit h-full">
                <span className="font-semibold text-sm text-grey-dark-0 text-right">
                    {Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 2 }).format(item.order_amount)}
                </span>
                <div className="flex items-center gap-3 p-1 bg-white rounded-full">
                    <Button
                        type="button"
                        size="icon-sm"
                        onClick={decrease}
                        variant="secondary"
                        className="size-5!"
                        disabled={(quantity === (item.item_min_order || item.item_quantity_size)) || isPending}
                    >
                        <Minus />
                    </Button>
                    <span className="text-center text-xs font-medium text-grey-dark-0 whitespace-nowrap">
                        {quantity} {item?.quantity_unit.toLowerCase()}{quantity === 1 ? "" : "s"}
                    </span>
                    <Button
                        type="button"
                        size="icon-sm"
                        variant="secondary"
                        className="size-5!"
                        onClick={increment}
                        disabled={isPending}
                    >
                        <Plus />
                    </Button>
                </div>
            </div>
        </div>
    )
}