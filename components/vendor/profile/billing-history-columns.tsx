"use client"

import { IconDownload } from "@/components/icons";
import { IconDot } from "@/components/icons/icon-dot";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns";


type TransactionStatus = "paid" | "pending";

export type BillingHistory = {
  date: string;
  id: string;
  description: string;
  amount: number;
  status: TransactionStatus;
}

export const columns: ColumnDef<BillingHistory>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
        const date = row.getValue("date") as BillingHistory["date"];
        return (
            <span className="flex-1 line-clamp-1 text-ellipsis">{format(date, "PP")}</span>
        )
    }
  },
  {
    accessorKey: "id",
    header: "Invoice ID",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
        const amount = row.getValue("amount") as BillingHistory["amount"];
        return (
            <span className="flex-1 line-clamp-1 text-ellipsis">{Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)}</span>
        )
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
        const status = row.getValue("status") as BillingHistory["status"];
        const variant = status === "paid" ? "completed" : "pending"
        return (
            <Badge variant={variant} className="[&>svg]:size-1.5!"><IconDot />{status}</Badge>
        )
    }
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
        return (
            <Button variant="secondary" size="icon-sm"><IconDownload /></Button>
        )
    }
  }
]