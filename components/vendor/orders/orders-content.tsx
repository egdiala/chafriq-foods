"use client";

import { useState } from "react"
import { OrderCard } from "./order-card"
import { OrderDetailsDrawer } from "./order-details-drawer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UploadPickupImagesDialog } from "./upload-pickup-images-dialog";

export const VendorOrdersContent = () => {
    const [open, setOpen] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    return (
        <>
            <Tabs defaultValue="pending">
                <TabsList>
                    <TabsTrigger value="pending">Pending Orders</TabsTrigger>
                    <TabsTrigger value="all">All Orders</TabsTrigger>
                </TabsList>
                <TabsContent value="pending" className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,420px))]">
                    {
                        Array.from({ length: 6 }).map((_order, index) => (
                            <OrderCard key={index} view={() => setOpen(true)} />
                        ))
                    }
                </TabsContent>
                <TabsContent value="all" className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,420px))]">
                    {
                        Array.from({ length: 10 }).map((_order, index) => (
                            <OrderCard key={index} view={() => setOpen(true)} />
                        ))
                    }
                </TabsContent>
            </Tabs>
            <OrderDetailsDrawer open={open} setOpen={setOpen} onDispatched={setOpenDialog} />
            <UploadPickupImagesDialog open={openDialog} setOpen={setOpenDialog} />
        </>
    )
}