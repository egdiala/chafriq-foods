"use client"

import { format } from "date-fns";
import { IconDot } from "@/components/icons/icon-dot";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table"
import { ORDER_STATUS, ORDER_STATUS_CLASSES } from "../orders/order-card";
import { VariantProps } from "class-variance-authority";
import { dateToRender } from "@/lib/utils";


export const columns: ColumnDef<GetVendorOrderResponse>[] = [
  {
    accessorKey: "menu_name",
    header: "Cuisine",
    cell: ({ row }) => {
        const image = row.original.menu_img
        const cuisine = row.getValue("menu_name") as GetVendorOrderResponse["menu_name"];
        return (
          <div className="flex items-center gap-1.5">
            <Avatar className="size-7">
              <AvatarImage src={image} alt="food" className="size-7 object-cover object-center" />
            </Avatar>
            <span className="flex-1 line-clamp-1 text-ellipsis">{cuisine}</span>
          </div>
        )
    }
  },
  {
    accessorKey: "quantity_size",
    header: "Quantity",
    cell: ({ row }) => {
        const quantity = row.getValue("quantity_size") as GetVendorOrderResponse["quantity_size"];
        const unit = row.original.quantity_unit
        return (
          <span className="flex-1 line-clamp-1 text-ellipsis">{quantity} {unit}{quantity === 1 ? "" : "s"}</span>
        )
    }
  },
  {
    accessorKey: "createdAt",
    header: "Ordered Date",
    cell: ({ row }) => {
        const createdAt = row.getValue("createdAt") as GetVendorOrderResponse["createdAt"];
        const date = dateToRender(createdAt as Date)
        return (
          <span className="flex-1 line-clamp-1 text-ellipsis">
            {date} • {format(createdAt, "hh:mmaaa")}
          </span>
        )
    }
  },
  {
    accessorKey: "order_end_date",
    header: "Pickup Date",
    cell: ({ row }) => {
        const endDate = row.getValue("order_end_date") as GetVendorOrderResponse["order_end_date"];
        const date = dateToRender(endDate as Date)
        return (
          <span className="flex-1 line-clamp-1 text-ellipsis">{date} • {format(endDate, "hh:mmaaa")}</span>
        )
    }
  },
  {
    accessorKey: "amount_total",
    header: "Amount",
    cell: ({ row }) => {
        const amount = row.getValue("amount_total") as GetVendorOrderResponse["amount_total"];
        return (
          <span className="flex-1 line-clamp-1 text-ellipsis">
            {Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 2 }).format(amount || 0)}
          </span>
        )
    }
  },
  {
    accessorKey: "order_status",
    header: "Status",
    cell: ({ row }) => {
        const status = row.getValue("order_status") as GetVendorOrderResponse["order_status"];
        return (
            <Badge variant={ORDER_STATUS_CLASSES[status] as unknown as VariantProps<typeof badgeVariants>["variant"]} className="[&>svg]:size-1.5!">
                <IconDot /> {ORDER_STATUS[status]}
            </Badge>
        )
    }
  }
]