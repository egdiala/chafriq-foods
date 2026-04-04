"use client"

import { IconDownload } from "@/components/icons";
import { IconDot } from "@/components/icons/icon-dot";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns";


export const columns: ColumnDef<SubscriptionPlanResponse>[] = [
  {
    accessorKey: "start_date",
    header: "Date",
    cell: ({ row }) => {
        const date = row.getValue("start_date") as SubscriptionPlanResponse["start_date"];
        return (
            <span className="flex-1 line-clamp-1 text-ellipsis">{format(date, "PP")}</span>
        )
    }
  },
  {
    accessorKey: "plansub_id",
    header: "Invoice ID",
  },
  // {
  //   accessorKey: "description",
  //   header: "Description",
  // },
  {
    accessorKey: "plan_amount",
    header: "Amount",
    cell: ({ row }) => {
        const amount = row.getValue("plan_amount") as SubscriptionPlanResponse["plan_amount"];
        return (
            <span className="flex-1 line-clamp-1 text-ellipsis">{Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 2 }).format(amount || 0)}</span>
        )
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
        const status = row.getValue("status") as SubscriptionPlanResponse["status"];
        const variant = status === 1 ? "completed" : "pending"
        return (
            <Badge variant={variant} className="[&>svg]:size-1.5!"><IconDot />{variant}</Badge>
        )
    }
  },
  // {
  //   accessorKey: "action",
  //   header: "Action",
  //   cell: ({ row }) => {
  //       return (
  //           <Button variant="secondary" size="icon-sm"><IconDownload /></Button>
  //       )
  //   }
  // }
]