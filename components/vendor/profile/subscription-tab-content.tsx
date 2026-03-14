
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { type BillingHistory, columns } from "./billing-history-columns"
import { IconCalendar, IconCurrencyDollar, IconDot } from "@/components/icons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

export const billingHistory: BillingHistory[] = [
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

export const SubscriptionTabContent = () => {
    const table = useReactTable({
        data: billingHistory,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getRowId: row => row.id,
    })
    
    const topCards = [
        {
            title: "Plan",
            description: "Plan 1",
            icon: <IconCurrencyDollar />
        },
        {
            title: "Last Payment Date",
            description: "12th Dec, 2024",
            icon: <IconCalendar />
        },
        {
            title: "Expiry Date",
            description: "12th Jan, 2025",
            icon: <IconCalendar />
        },
    ]
    const planCards = [
        {
            title: "Pay-as-you-go",
            value: "$0/month",
            button: <Button variant="secondary" size="sm">Current Plan</Button>,
            background: "inset-ring-1 inset-ring-outline",
            benefits: [
                "Up to 5 menu posts at a time, with a 24-hour approval delay.",
                "24-hour delay on in-platform messaging, use SMS and email.",
                "Single user account. Limited reporting."
            ]
        },
        {
            title: "Subscription",
            value: "$150/month",
            button: <Button size="sm">Upgrade Now</Button>,
            background: "bg-orange-5",
            benefits: [
                "50 cooks can access the platform",
                "Unlimited menu posts, live instantly",
                "Real-time chat, SMS, and video scheduling, plus recipe and document access",
                "Multi-seat access with roles, activity tracking, and access control."
            ]
        },
    ]
    return (
        <>
            <div className="flex flex-col gap-1">
                <h1 className="uppercase font-medium text-xs text-neu">Subscription</h1>
                <p className="text-grey-dark-3 text-xs">Manage your subscriptions</p>
            </div>

            <div className="flex items-center gap-3 sm:gap-6">
            {
                topCards.map((card, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 sm:p-5 inset-ring-1 inset-ring-outline first:inset-ring-grey-dark-4 rounded-lg flex-1 first:bg-grey-dark-4 first:hidden sm:first:flex">
                        <div className="grid place-content-center-safe size-8 bg-orange-5 text-orange-2 [&>svg]:size-4 rounded-xl">{card.icon}</div>
                        <div className="grid gap-1">
                            <span className="text-[0.625rem] sm:text-xs text-grey-dark-2">{card.title}</span>
                            <p className="text-xs sm:text-sm text-grey-dark-0">{card.description}</p>
                        </div>
                    </div>
                ))
            }
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
            {
                planCards.map((plan, index) => (
                    <div key={index} className={cn("flex flex-col gap-3 sm:gap-4 p-3 sm:p-5 rounded-xl", plan.background)}>
                        <div className="flex items-center sm:items-start justify-between sm:justify-start sm:flex-col gap-4 [&_button]:font-medium [&_button]:text-sm [&_button]:sm:w-full">
                            <div className="grid gap-1 sm:gap-2">
                                <h2 className="text-xs sm:text-sm font-medium text-grey-dark-0">{plan.title}</h2>
                                <p className="font-sora text-base sm:text-2xl text-grey-dark-2">{plan.value}</p>
                            </div>
                            {plan.button}
                        </div>
                        <ul>
                        {
                            plan.benefits.map((benefit, n) => (
                                <li key={n} className="mb-2 last:mb-0">
                                    <div className="flex items-start gap-2">
                                        <IconDot className="text-orange-2 mt-1" />
                                        <span className="flex-1 text-xs text-grey-dark-2">{benefit}</span>
                                    </div>
                                </li>
                            ))
                        }
                        </ul>
                    </div>
                ))
            }
            </div>

            <Card className="sm:py-4 ring-0 sm:ring-1">
                <CardHeader className="px-0 sm:px-4">
                    <CardTitle className="font-medium text-sm">Billing History</CardTitle>
                </CardHeader>
                <CardContent className="space-y-9 px-0 sm:px-4">
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
                </CardContent>
            </Card>
        </>
    )
}