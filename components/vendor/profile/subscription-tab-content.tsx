import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useMemo, useState } from "react"
import { useUser } from "@/context/use-user"
import { CheckoutForm } from "./checkout-form"
import { loadStripe } from "@stripe/stripe-js"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Spinner } from "@/components/ui/spinner"
import { DataTable } from "@/components/data-table"
import { Skeleton } from "@/components/ui/skeleton"
import { columns } from "./billing-history-columns"
import { StripeElementWrapper } from "./stripe-element-wrapper"
import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useGetSubscription } from "@/services/queries/use-subscription"
import { useInitSubscription } from "@/services/mutations/use-subscription"
import { IconCalendar, IconCurrencyDollar, IconDot } from "@/components/icons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"


export const SubscriptionTabContent = () => {
    const { data } = useGetSubscription({ request_type: "1", timezone: Intl.DateTimeFormat().resolvedOptions().timeZone })
    const { data: count } = useGetSubscription({ request_type: "1", timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, component: "count" })

    const table = useReactTable({
        data: (data?.data || []) as SubscriptionPlanResponse[],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getRowId: row => row.plansub_id,
    })
    return (
        <>
            <div className="flex flex-col gap-1">
                <h1 className="uppercase font-medium text-xs text-neu">Subscription</h1>
                <p className="text-grey-dark-3 text-xs">Manage your subscriptions</p>
            </div>

            <TopCards />

            <PlanCards />

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
                                {
                                    Array.from({ length: (count?.data as SubscriptionPlanCountResponse)?.total }).map((_, index) => (
                                        <PaginationItem key={index}>
                                            <PaginationLink href="#">{index+1}</PaginationLink>
                                        </PaginationItem>
                                    ))
                                }
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

const TopCards = () => {
    const { user: userObj } = useUser()

    const user = userObj as VendorProfileResponse;
    const { data, isLoading } = useGetSubscription({ request_type: "1", timezone: Intl.DateTimeFormat().resolvedOptions().timeZone })
    
    const activePlan = (data?.data as unknown as SubscriptionPlanResponse[])
    const topCards = useMemo(() => {
        return [
            {
                title: "Plan",
                description: activePlan?.[0]?.plan_name || "",
                icon: <IconCurrencyDollar />
            },
            {
                title: "Last Payment Date",
                description: activePlan?.[0]?.start_date ? format(activePlan?.[0]?.start_date, "do MMM, yyyy") : "",
                icon: <IconCalendar />
            },
            {
                title: "Expiry Date",
                description: activePlan?.[0]?.expiry_date ? format(activePlan?.[0]?.expiry_date, "do MMM, yyyy") : "",
                icon: <IconCalendar />
            },
        ]
    }, [activePlan])

    if (!user?.plan_data?.plansub_id) {
        return null
    }

    return (
        <>
        {
            isLoading ? (
                <div className="flex items-center gap-3 sm:gap-6">
                {
                    Array.from({ length: 3 }).map((_, index) => (
                        <div key={index}>
                            <Skeleton className="h-20" />
                        </div>
                    ))
                }
                </div>
            ) : (!isLoading && data && (data?.data as SubscriptionSetupResponse[])) ? (
                <div className="flex items-center gap-3 sm:gap-6">
                {
                    topCards.map((card, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 sm:p-5 inset-ring-1 inset-ring-outline first:inset-ring-grey-dark-4 rounded-lg flex-1 first:bg-grey-dark-4 first:hidden sm:first:flex">
                            <div className="grid place-content-center-safe size-8 bg-orange-5 text-orange-2 [&>svg]:size-4 rounded-xl">{card.icon}</div>
                            <div className="grid gap-1">
                                <span className="text-2xs sm:text-xs text-grey-dark-2">{card.title}</span>
                                <p className="text-xs sm:text-sm text-grey-dark-0">{card.description}</p>
                            </div>
                        </div>
                    ))
                }
                </div>
            ) : (
                null
            )
        }
        </>
    )
}

const PlanCards = () => {
    const { user: userObj } = useUser()

    const user = userObj as VendorProfileResponse;
    const [isYearly, setIsYearly] = useState(false)
    const { mutate, isPending, variables, data: paymentData } = useInitSubscription()
    const { data, isLoading } = useGetSubscription({ request_type: "2", timezone: Intl.DateTimeFormat().resolvedOptions().timeZone })
    return (
        <>
        {
            isLoading ? (
                <div className="grid sm:grid-cols-2 gap-4">
                {
                    Array.from({ length: 2 }).map((_, index) => (
                        <div key={index}>
                            <Skeleton className="h-63" />
                        </div>
                    ))
                }
                </div>
            ) : (!isLoading && data && (data?.data as SubscriptionSetupResponse[])) ? (
                <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-grey-dark-2 font-medium">Monthly</span>
                        <Switch checked={isYearly} onCheckedChange={setIsYearly} />
                        <span className="text-sm text-grey-dark-2 font-medium">Yearly</span>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 w-full">
                    {
                        (data?.data as SubscriptionSetupResponse[]).map((plan, index) => {
                            const isActivePlan = plan.plansetup_id === user.plan_data?.plansetup_id;
                            return (
                                <div key={index} className={cn("flex flex-col gap-3 sm:gap-4 p-3 sm:p-5 rounded-xl", plan.plan_name.toLowerCase() === "starter" ? "bg-orange-5" : "inset-ring-1 inset-ring-outline")}>
                                    <div className="flex flex-1 items-center sm:items-start justify-between sm:justify-start sm:flex-col gap-4 [&_button]:font-medium [&_button]:text-sm [&_button]:sm:w-full">
                                        <div className="grid gap-1 sm:gap-2">
                                            <h2 className="text-xs sm:text-sm font-medium text-grey-dark-0">{plan.plan_name}</h2>
                                            <span className="font-sora text-base sm:text-2xl text-grey-dark-2 tabular-nums">
                                                {Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(isYearly ? plan.yearly_cost : plan.monthly_cost)}
                                            </span>
                                        </div>
                                        <>
                                        {
                                            (plan.plan_name.toLowerCase() !== "freemium") ? (
                                                <Button 
                                                    type="button" size="sm" disabled={isPending && (plan.plansetup_id === variables.plansetup_id)}
                                                    onClick={() => isActivePlan ? {} : mutate({ plansetup_id: plan.plansetup_id, duration_type: !isYearly ? "monthly" : "yearly"})}
                                                    className={cn(isActivePlan ? "hover:after:translate-y-full sm:w-full active:scale-100" : "")}
                                                    asChild={isActivePlan}
                                                >
                                                    {
                                                        (isActivePlan) ? (
                                                            <div>Current Plan</div>
                                                        ) : (
                                                            <>
                                                                Upgrade Now
                                                                {(isPending) && (<Spinner className="sm:absolute right-4 size-5" />)}
                                                            </>
                                                        )
                                                    }
                                                </Button>
                                            ) : (
                                                <>
                                                {
                                                    !user.plan_data?.plansub_id && (
                                                        <Button 
                                                            variant="secondary" size="sm" 
                                                            className="hover:after:translate-y-full hover:text-orange-2 sm:w-full active:scale-100" asChild
                                                        >
                                                            <div>Current Plan</div>
                                                        </Button>          
                                                    )
                                                }
                                                </>
                                            )
                                        }
                                        </>
                                    </div>
                                    <ul>
                                    {
                                        plan.description.map((benefit, n) => (
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
                            )
                        })
                    }
                    </div>
                </div>
            ) : (
                null
            )
        }
        
        {paymentData && <StripePayment data={paymentData.data} />}
        </>
    )
}

interface IStripePayment {
  data: InitSubscriptionResponse;
}

const StripePayment = ({ data }: IStripePayment) => {
  const { app_secret, client_secret, payment_id } = data;
  const stripePromise = loadStripe(app_secret);

  return (
    <StripeElementWrapper
      client_secret={client_secret}
      stripePromise={stripePromise}
    >
      <CheckoutForm
        transactionId={payment_id}
        secret={client_secret}
      />
    </StripeElementWrapper>
  );
};