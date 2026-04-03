import { Badge, badgeVariants } from "@/components/ui/badge"
import { IconDot } from "@/components/icons/icon-dot"
import { Separator } from "@/components/ui/separator"
import { IconBowlSteam, IconCyclist, IconUser } from "@/components/icons"
import { format } from "date-fns"
import { VariantProps } from "class-variance-authority"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

type Props = {
    view: () => void;
    order: GetVendorOrderResponse;
}

export const ORDER_STATUS = {
    1: "new",
    2: "ongoing",
    3: "ready for pickup",
    4: "completed",
    5: "cancelled"
}

export const ORDER_STATUS_CLASSES = {
    1: "completed",
    2: "pending",
    3: "secondary",
    4: "default",
    5: "destructive"
}

export const OrderCard = ({ order, view }: Props) => {
    return (
        <div onClick={view} className="flex items-start p-3 gap-3 sm:gap-4 rounded-lg inset-ring-1 inset-ring-outline cursor-pointer">
            <Avatar className="size-13 sm:size-24.5 bg-orange-1 outline -outline-offset-1 outline-white/10">
                <AvatarImage src={order.menu_img} alt={order.menu_name} className="object-cover size-13 sm:size-24.5" />
            </Avatar>
            <div className="grid gap-2.5 flex-1">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="grid gap-2 sm:gap-1">
                        <span className="font-semibold text-sm text-grey-dark-0">{order?.menu_name}</span>
                        <div className="flex items-center flex-wrap gap-4 sm:gap-6">
                            <div className="flex items-center gap-1 text-xs text-grey-dark-3 [&>svg]:text-grey-dark-0 [&>svg]:size-3.5">
                                <IconBowlSteam />
                                {order?.quantity_size} {order?.quantity_unit}{order?.quantity_size === 1 ? "" : "s"}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-grey-dark-3 [&>svg]:text-grey-dark-0 [&>svg]:size-3.5">
                                <IconCyclist />
                                {format(order?.order_start_date, "do MMM, yyyy")}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between sm:flex-col gap-1">
                        <span className="font-semibold text-sm text-grey-dark-2 text-right">{Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 2 }).format(order.amount_total || 0)}</span>
                        <Badge variant={ORDER_STATUS_CLASSES[order.order_status] as unknown as VariantProps<typeof badgeVariants>["variant"]} className="capitalize [&>svg]:size-1.5!">
                            <IconDot /> {ORDER_STATUS[order.order_status]}
                        </Badge>
                    </div>
                </div>
                <Separator className="hidden sm:block" />
                <div className="hidden sm:flex flex-col gap-2 flex-1">
                    <div className="flex items-center justify-between flex-1">
                        <div className="flex items-center gap-1 text-xs font-medium text-grey-dark-2 [&>svg]:text-grey-dark-0 [&>svg]:size-3.5">
                            <IconUser />
                            {order.receiver_name}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}