"use client";

import { cn } from "@/lib/utils";
import { columns } from "./recent-orders-column";
import { DataTable } from "@/components/data-table";
import { useGetOrders } from "@/services/queries/use-orders";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";

type Props = {
    className?: string;
}

export const RecentOrders = ({ className }: Props) => {
    const { data: newOrders, isLoading: isLoadingNewOrders } = useGetOrders({ })
    
    const table = useReactTable({
        data: (newOrders?.data || []) as GetVendorOrderResponse[],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getRowId: row => row.item_id,
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