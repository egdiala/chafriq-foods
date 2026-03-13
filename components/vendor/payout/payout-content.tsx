"use client";

import { columns, type Transaction } from "./payout-columns";
import { DataTable } from "@/components/data-table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

export const transactions: Transaction[] = [
  {
    id: "LMNOP9876543",
    date: "2025-08-15",
    description: "Payout",
    amount: 250,
    status: "paid",
  },
  {
    id: "ABCDEF123456",
    date: "2025-08-18",
    description: "Payout",
    amount: 75,
    status: "pending",
  },
  {
    id: "GHIJKL987654",
    date: "2025-08-20",
    description: "Refund Processed",
    amount: 200,
    status: "pending",
  },
  {
    id: "QRSTUV123456",
    date: "2025-08-25",
    description: "Payout",
    amount: 500,
    status: "pending",
  },
  {
    id: "MNPQRST789012",
    date: "2025-08-30",
    description: "Payout",
    amount: 300,
    status: "pending",
  },
  {
    id: "UVWXY1234567",
    date: "2025-09-05",
    description: "Payout",
    amount: 100,
    status: "pending",
  },
  {
    id: "XYZ12345678",
    date: "2025-08-01",
    description: "Payout",
    amount: 150,
    status: "pending",
  },
];

export const VendorPayoutContent = () => {
    const table = useReactTable({
        data: transactions,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getRowId: row => row.id,
    })
    
    return (
        <div className="flex flex-col gap-6">
            <h1 className="font-medium text-sm text-grey-dark-0">Payout History</h1>
            <div className="grid">
                <DataTable columns={columns} table={table} />
            </div>
            <div className="flex items-center justify-between gap-4">
                <span className="text-xs text-grey-dark-3">Showing page <span className="text-grey-dark-0">24 of 30</span></span>

                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    )
}