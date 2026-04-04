"use client";

import { IconStarFull, IconTrendingUp } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/context/use-user";
import { cn } from "@/lib/utils";
import { useGetSubscription } from "@/services/queries/use-subscription";
import { format } from "date-fns";
import Link from "next/link";

type Props = {
    className?: string;
}

export const PlanCard = ({ className }: Props) => {
    const { user: userObj } = useUser()
    const user = userObj as VendorProfileResponse;
    
    const { data, isLoading } = useGetSubscription({ request_type: "2", timezone: Intl.DateTimeFormat().resolvedOptions().timeZone })

    const freePlan = (data?.data as SubscriptionSetupResponse[])?.find((plan) => plan.monthly_cost === 0)
    return (
        <div className={cn("flex flex-col gap-3 p-5 rounded-2xl inset-ring-1 inset-ring-outline", className)}>
            <div className="flex items-center gap-3">
                <Avatar className="size-14 rounded-2xl">
                    <AvatarImage src={user?.business_logo} className="rounded-2xl" />
                    <AvatarFallback className="sm:text-2xl">{user?.business_name?.split(" ")?.[0]?.at(0)}{user?.business_name?.split(" ")?.[1]?.at(0)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-px">
                    <span className="font-semibold text-base text-grey-dark-0">{user?.business_name}</span>
                    <div className="flex items-center gap-2 text-sm text-grey-dark-2 [&>svg]:text-yellow-2"><IconStarFull /> {(user?.rating || 0).toFixed(1)}</div>
                </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
                <div className="grid gap-px flex-1">
                    <span className="font-semibold text-base text-grey-dark-0">{user?.plan_data?.plan_name || freePlan?.plan_name}</span>
                    {user?.plan_data?.expiry_date && (<p className="text-xs text-grey-dark-3">Expiry: {format(user?.plan_data?.expiry_date as Date, "do MMM, yyyy")}</p>)}
                </div>
                {
                    !user?.plan_data?.plansub_id && (
                        <Button size="sm" variant="secondary" className="font-medium h-8.5" asChild>
                            <Link href="/vendor/profile?tab=subscription">
                                <IconTrendingUp />
                                Upgrade Now
                            </Link>
                        </Button>
                    )
                }
            </div>
        </div>
    )
}