"use client";

import { useState } from "react"
import { OrderCard } from "./order-card"
import { OrderDetailsDrawer } from "./order-details-drawer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UploadPickupImagesDialog } from "./upload-pickup-images-dialog";
import { useGetOrders } from "@/services/queries/use-orders";
import { Skeleton } from "@/components/ui/skeleton";
import { IconBowlSteam } from "@/components/icons";

export const VendorOrdersContent = () => {
    const [open, setOpen] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)

    const { data, isLoading } = useGetOrders({ })
    const { data: newOrders, isLoading: isLoadingNewOrders } = useGetOrders({ status: "1" })
    return (
        <>
            <Tabs defaultValue="pending">
                <TabsList>
                    <TabsTrigger value="pending">New Orders</TabsTrigger>
                    <TabsTrigger value="all">All Orders</TabsTrigger>
                </TabsList>
                <TabsContent value="pending">
                {
                    isLoadingNewOrders ? (
                        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,420px))]">
                        {
                            Array.from({ length: 6 }).map((_, index) => (
                                <div key={index}>
                                    <Skeleton className="h-60" />
                                </div>
                            ))
                        }
                        </div>
                    ) : (!isLoadingNewOrders && newOrders && ((newOrders?.data as GetVendorOrderResponse[]).length > 0)) ? (
                        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,420px))]">
                        {
                            (newOrders.data as GetVendorOrderResponse[]).map((order) => (
                                <OrderCard key={order?.item_id} order={order} view={() => setOpen(true)} />
                            ))
                        }
                        </div>
                    ) : (
                        <div className="flex flex-col items-center w-full max-w-md text-center mx-auto py-24">
                            <div className="bg-orange-5 rounded-full grid place-content-center size-9 inset-ring-1 inset-ring-orange-2/50 mb-4">
                                <IconBowlSteam className="size-4.5 text-orange-2" />
                            </div>
                            <span className="text-grey-dark-0 text-base font-semibold">Ready to start selling?</span>
                            <p className="text-grey-dark-2 text-sm font-normal">Add your first cuisine to create your menu and let customers discover what you cook best.</p>
                        </div>
                    )
                }
                </TabsContent>
                <TabsContent value="all">
                {
                    isLoading ? (
                        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,420px))]">
                        {
                            Array.from({ length: 6 }).map((_, index) => (
                                <div key={index}>
                                    <Skeleton className="h-60" />
                                </div>
                            ))
                        }
                        </div>
                    ) : (!isLoading && data && ((data?.data as GetVendorOrderResponse[]).length > 0)) ? (
                        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,420px))]">
                        {
                            (data.data as GetVendorOrderResponse[]).map((order) => (
                                <OrderCard key={order?.item_id} order={order} view={() => setOpen(true)} />
                            ))
                        }
                        </div>
                    ) : (
                        <div className="flex flex-col items-center w-full max-w-md text-center mx-auto py-24">
                            <div className="bg-orange-5 rounded-full grid place-content-center size-9 inset-ring-1 inset-ring-orange-2/50 mb-4">
                                <IconBowlSteam className="size-4.5 text-orange-2" />
                            </div>
                            <span className="text-grey-dark-0 text-base font-semibold">Ready to start selling?</span>
                            <p className="text-grey-dark-2 text-sm font-normal">Add your first cuisine to create your menu and let customers discover what you cook best.</p>
                        </div>
                    )
                }
                </TabsContent>
            </Tabs>
            <OrderDetailsDrawer open={open} setOpen={setOpen} onDispatched={setOpenDialog} />
            <UploadPickupImagesDialog open={openDialog} setOpen={setOpenDialog} />
        </>
    )
}