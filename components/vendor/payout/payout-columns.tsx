"use client"

import { IconDot } from "@/components/icons/icon-dot";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns";


type TransactionStatus = "paid" | "pending";

export type Transaction = {
  date: string;
  id: string;
  description: string;
  amount: number;
  status: TransactionStatus;
}

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
        const date = row.getValue("date") as Transaction["date"];
        return (
            <span className="flex-1 line-clamp-1 text-ellipsis">{format(date, "PP")}</span>
        )
    }
  },
  {
    accessorKey: "id",
    header: "Transaction ID",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
        const amount = row.getValue("amount") as Transaction["amount"];
        return (
            <span className="flex-1 line-clamp-1 text-ellipsis">{Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)}</span>
        )
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
        const status = row.getValue("status") as Transaction["status"];
        const variant = status === "paid" ? "completed" : "pending"
        return (
            <Badge variant={variant} className="[&>svg]:size-1.5!"><IconDot />{status}</Badge>
        )
    }
  }
]