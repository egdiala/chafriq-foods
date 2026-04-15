import Link from "next/link";
import { format } from "date-fns";
import { dateToRender } from "@/lib/utils";
import { IconDot } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ORDER_STATUS, ORDER_STATUS_CLASSES } from "@/components/vendor/orders/order-card";
import { CancelOrder } from "./cancel-order";
import { useState } from "react";

type Props = {
    item: GetCustomerOrderResponse;
}

export const OrderItem = ({ item }: Props) => {   
    const [open, setOpen] = useState(false)
    return (
        <>
        <div className="flex items-center gap-4 rounded-lg bg-grey-dark-4 p-3 relative">
            <Link href={`/customer/orders/${item.order_id}`} className="absolute inset-0 w-full h-full" />
            <Avatar className="size-12 sm:size-18 rounded">
                <AvatarImage src={item.file_url} alt={item.menu_name} className="size-12 sm:size-18 rounded" />
            </Avatar>
            <div className="grid gap-2">
                <span className="font-medium text-xs text-grey-dark-2">{item.menu_name}</span>
                <p className="text-xs text-grey-dark-3 line-clamp-1">{item.menu_content}</p>
                <div className="flex items-center gap-4">
                    <span className="font-semibold text-sm text-grey-dark-0">
                        {Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 2 }).format(item.amount_total)}
                    </span>
                    <Badge variant={ORDER_STATUS_CLASSES[item.order_status] as unknown as VariantProps<typeof badgeVariants>["variant"]} className="capitalize [&>svg]:size-1.5!">
                        <IconDot /> {ORDER_STATUS[item.order_status]}
                    </Badge>
                </div>
            </div>
            <div className="flex flex-col justify-between items-end w-fit flex-1 self-stretch">
                <div className="text-2xs text-right text-grey-dark-2 whitespace-nowrap">
                    {dateToRender(item.order_start_date as Date)}, {format(item.order_start_date, "hh:mmaaa")}
                </div>
                {
                    item.order_status === 1 && (
                        <Button size="smallest" variant="default" className="text-xs font-medium isolate" type="button" onClick={() => setOpen(true)}>
                            Cancel Order
                        </Button>
                    )
                }
                {
                    item.order_status === 4 && (
                        <Button size="smallest" variant="default" className="text-xs font-medium isolate" asChild>
                            <Link href={`/meals/${item._id}`}>
                                Buy Again
                            </Link>
                        </Button>
                    )
                }
            </div>
        </div>
        <CancelOrder open={open} orderId={item.order_id} setOpen={setOpen} />
        </>
    )
}