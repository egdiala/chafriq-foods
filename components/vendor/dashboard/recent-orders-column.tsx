"use client"

import { IconDot } from "@/components/icons/icon-dot";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table"


type OrderStatus = "pending" | "completed";

export type Order = {
  id: string;
  cuisine: string;
  quantity: number;
  unit: string;
  orderedAt: string;
  pickupAt: string;
  amount: number;
  currency: string;
  status: OrderStatus;
  image: string;
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "cuisine",
    header: "Cuisine",
    cell: ({ row }) => {
        const cuisine = row.getValue("cuisine") as Order["cuisine"];
        return (
            <div className="flex items-center gap-1.5">
                <div className="rounded-full overflow-hidden size-7!">
                    <img
                        src="https://images.unsplash.com/photo-1432139555190-58524dae6a55?q=80&w=2676&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="food"
                        className="size-7 object-cover object-center"
                    />
                </div>
                <span className="flex-1 line-clamp-1 text-ellipsis">{cuisine}</span>
            </div>
        )
    }
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => {
        const quantity = row.getValue("quantity") as Order["quantity"];
        return (
            <span className="flex-1 line-clamp-1 text-ellipsis">{quantity} plates</span>
        )
    }
  },
  {
    accessorKey: "orderedAt",
    header: "Ordered Date",
  },
  {
    accessorKey: "pickupAt",
    header: "Pickup Date",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
        const amount = row.getValue("amount") as Order["amount"];
        const currency = row.original.currency
        return (
            <span className="flex-1 line-clamp-1 text-ellipsis">{Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount)}</span>
        )
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
        const status = row.getValue("status") as Order["status"];
        return (
            <Badge variant={status} className="[&>svg]:size-1.5!"><IconDot />{status}</Badge>
        )
    }
  }
]