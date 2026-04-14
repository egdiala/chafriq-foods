"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetCustomerOrders } from "@/services/queries/use-orders"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IconHandHeart, IconLock, IconPackage, IconSecurePrivacy, PoweredByStripe } from "@/components/icons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OrderItem } from "./order-item"

export const CustomerOrdersContent = () => {
    const { data, isLoading } = useGetCustomerOrders({})
    const { data: pendingOrders, isLoading: isLoadingPendingOrders } = useGetCustomerOrders({ status: "2" })
    const { data: deliveredOrders, isLoading: isLoadingDeliveredOrders } = useGetCustomerOrders({ status: "4" })
    return (
        <div className="flex flex-col gap-6">
            <h1 className="font-extrabold text-2xl font-sora">Orders</h1>
            <Tabs defaultValue="all">
                <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="delivered">Delivered</TabsTrigger>
                </TabsList>
                <div className="grid items-start gap-8 lg:grid-cols-12">
                    <TabsContent value="all" className="flex flex-col gap-6 lg:col-span-8 xl:col-span-9">
                    {
                        isLoading ? (
                            <div className="grid gap-6">
                            {
                                Array.from({ length: 6 }).map((_, index) => (
                                    <div key={index}>
                                        <Skeleton className="h-60" />
                                    </div>
                                ))
                            }
                            </div>
                        ) : (!isLoading && data && ((data?.data as GetCustomerOrderResponse[]).length > 0)) ? (
                            <Card size="sm" className="ring-0 sm:ring-1">
                                <CardContent className="group-data-[size=sm]/card:px-0 group-data-[size=sm]/card:sm:px-4 space-y-4">
                                    <CardHeader className="px-0!">
                                        <CardTitle className="text-sm font-normal text-grey-dark-0 uppercase">All orders</CardTitle>
                                    </CardHeader>
                                    {
                                        (data.data as GetCustomerOrderResponse[]).map((order) => (
                                            <OrderItem key={order?.order_id} item={order} />
                                        ))
                                    }
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="flex flex-col items-center w-full max-w-md text-center mx-auto py-24">
                                <div className="bg-orange-5 rounded-full grid place-content-center size-9 inset-ring-1 inset-ring-orange-2/50 mb-4">
                                    <IconPackage className="size-4.5 text-orange-2" />
                                </div>
                                <span className="text-grey-dark-0 text-base font-semibold">Your order history is empty</span>
                                <p className="text-grey-dark-2 text-sm font-normal">Start exploring meals and place your first order—it’ll show up here.</p>
                                <Button size="default" className="mt-4" asChild><Link href="/meals">Order Meals</Link></Button>
                            </div>
                        )
                    }
                    </TabsContent>
                    <TabsContent value="pending" className="flex flex-col gap-6 lg:col-span-8 xl:col-span-9">
                    {
                        isLoadingPendingOrders ? (
                            <div className="grid gap-6">
                            {
                                Array.from({ length: 6 }).map((_, index) => (
                                    <div key={index}>
                                        <Skeleton className="h-60" />
                                    </div>
                                ))
                            }
                            </div>
                        ) : (!isLoadingPendingOrders && pendingOrders && ((pendingOrders?.data as GetCustomerOrderResponse[]).length > 0)) ? (
                            <Card size="sm" className="ring-0 sm:ring-1">
                                <CardContent className="group-data-[size=sm]/card:px-0 group-data-[size=sm]/card:sm:px-4 space-y-4">
                                    <CardHeader className="px-0!">
                                        <CardTitle className="text-sm font-normal text-grey-dark-0 uppercase">All orders</CardTitle>
                                    </CardHeader>
                                    {
                                        (pendingOrders.data as GetCustomerOrderResponse[]).map((order) => (
                                            <OrderItem key={order?.order_id} item={order} />
                                        ))
                                    }
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="flex flex-col items-center w-full max-w-md text-center mx-auto py-24">
                                <div className="bg-orange-5 rounded-full grid place-content-center size-9 inset-ring-1 inset-ring-orange-2/50 mb-4">
                                    <IconPackage className="size-4.5 text-orange-2" />
                                </div>
                                <span className="text-grey-dark-0 text-base font-semibold">No pending orders</span>
                                <p className="text-grey-dark-2 text-sm font-normal">You don’t have any active orders right now. New orders will appear here while they’re being prepared.</p>
                                <Button size="default" className="mt-4" asChild><Link href="/meals">Order Meals</Link></Button>
                            </div>
                        )
                    }
                    </TabsContent>
                    <TabsContent value="delivered" className="flex flex-col gap-6 lg:col-span-8 xl:col-span-9">
                    {
                        isLoadingDeliveredOrders ? (
                            <div className="grid gap-6">
                            {
                                Array.from({ length: 6 }).map((_, index) => (
                                    <div key={index}>
                                        <Skeleton className="h-60" />
                                    </div>
                                ))
                            }
                            </div>
                        ) : (!isLoadingDeliveredOrders && deliveredOrders && ((deliveredOrders?.data as GetCustomerOrderResponse[]).length > 0)) ? (
                            <Card size="sm" className="ring-0 sm:ring-1">
                                <CardContent className="group-data-[size=sm]/card:px-0 group-data-[size=sm]/card:sm:px-4 space-y-4">
                                    <CardHeader className="px-0!">
                                        <CardTitle className="text-sm font-normal text-grey-dark-0 uppercase">All orders</CardTitle>
                                    </CardHeader>
                                    {
                                        (deliveredOrders.data as GetCustomerOrderResponse[]).map((order) => (
                                            <OrderItem key={order?.order_id} item={order} />
                                        ))
                                    }
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="flex flex-col items-center w-full max-w-md text-center mx-auto py-24">
                                <div className="bg-orange-5 rounded-full grid place-content-center size-9 inset-ring-1 inset-ring-orange-2/50 mb-4">
                                    <IconPackage className="size-4.5 text-orange-2" />
                                </div>
                                <span className="text-grey-dark-0 text-base font-semibold">Nothing delivered yet</span>
                                <p className="text-grey-dark-2 text-sm font-normal">Orders you’ve received will appear here once they’ve been completed.</p>
                                <Button size="default" className="mt-4" asChild><Link href="/meals">Order Meals</Link></Button>
                            </div>
                        )
                    }
                    </TabsContent>
                    <div className="flex flex-col gap-7 lg:col-span-4 xl:col-span-3">
                        <div className="grid gap-4">
                            <div className="flex items-center justify-between p-3 gap-1 rounded-lg bg-grey-dark-4">
                                <div className="flex items-center gap-1">
                                    <IconSecurePrivacy />
                                    <span className="font-medium text-xs text-grey-dark-0">Secure Payments</span>
                                </div>
                                <PoweredByStripe />
                            </div>
                            <div className="flex items-center justify-between p-3 gap-1 rounded-lg bg-grey-dark-4">
                                <div className="flex items-center gap-1">
                                    <IconHandHeart className="size-4 text-grey-dark-3" />
                                    <span className="font-medium text-xs text-grey-dark-2">Need help?</span>
                                </div>
                                <Button variant="link" size="smallest">Contact Us</Button>
                            </div>
                        </div>
                        <div className="grid gap-1">
                            <div className="flex items-center gap-1">
                                <IconPackage className="size-3.5 text-orange-2" />
                                <span className="font-medium text-xs text-grey-dark-2">Pickup arrangements</span>
                            </div>
                            <p className="text-xs text-grey-dark-3">Pickup arrangements are handled directly between the cook and customer after order confirmation.</p>
                        </div>
                        <div className="grid gap-1">
                            <div className="flex items-center gap-1">
                                <IconLock className="size-3.5 text-orange-2" />
                                <span className="font-medium text-xs text-grey-dark-2">Secure privacy</span>
                            </div>
                            <p className="text-xs text-grey-dark-3">Protecting your privacy is important to us! Please be assured that your information will be kept secured and uncompromised. We will only use your information in accordance with our privacy policy to provide and improve our services to you.</p>
                        </div>
                    </div>
                </div>
            </Tabs>
        </div>
    )
}