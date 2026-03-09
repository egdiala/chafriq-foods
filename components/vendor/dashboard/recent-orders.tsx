"use client";

import { cn } from "@/lib/utils";
import { columns, type Order } from "./recent-orders-column";
import { DataTable } from "@/components/data-table";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";

type Props = {
    className?: string;
}

const orders: Order[] = [
  {
    id: "ord_1",
    cuisine: "Vegetable Stir-fry",
    quantity: 2,
    unit: "plates",
    orderedAt: "Today • 12:34pm",
    pickupAt: "Today • 12:34pm",
    amount: 34.64,
    currency: "USD",
    status: "pending",
    image: "/images/vegetable-stirfry.png"
  },
  {
    id: "ord_2",
    cuisine: "Vegetable Stir-fry",
    quantity: 2,
    unit: "plates",
    orderedAt: "Today • 12:34pm",
    pickupAt: "Today • 12:34pm",
    amount: 34.64,
    currency: "USD",
    status: "pending",
    image: "/images/vegetable-stirfry.png"
  },
  {
    id: "ord_3",
    cuisine: "Vegetable Stir-fry",
    quantity: 2,
    unit: "plates",
    orderedAt: "Today • 12:34pm",
    pickupAt: "Today • 12:34pm",
    amount: 34.64,
    currency: "USD",
    status: "completed",
    image: "/images/vegetable-stirfry.png"
  },
  {
    id: "ord_4",
    cuisine: "Vegetable Stir-fry",
    quantity: 2,
    unit: "plates",
    orderedAt: "Today • 12:34pm",
    pickupAt: "Today • 12:34pm",
    amount: 34.64,
    currency: "USD",
    status: "completed",
    image: "/images/vegetable-stirfry.png"
  },
  {
    id: "ord_5",
    cuisine: "Vegetable Stir-fry",
    quantity: 2,
    unit: "plates",
    orderedAt: "Today • 12:34pm",
    pickupAt: "Today • 12:34pm",
    amount: 34.64,
    currency: "USD",
    status: "completed",
    image: "/images/vegetable-stirfry.png"
  }
];

export const RecentOrders = ({ className }: Props) => {
    const table = useReactTable({
        data: orders,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getRowId: row => row.id,
    })
    return (
        <Card className={cn("py-4", className)}>
            <CardHeader className="px-4">
                <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent className="px-4">
                <div className="grid">
                    <DataTable columns={columns} table={table} />
                </div>
            </CardContent>
        </Card>
    )
}