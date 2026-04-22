"use client"

import Link from "next/link"
import { useState } from "react"
import { format } from "date-fns"
import { OrderItem } from "./order-item"
import { dateToRender } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { AnimatePresence, motion } from "motion/react"
import { useGetCustomerOrders } from "@/services/queries/use-orders"
import { IconArrowDown, IconHandHeart, IconLock, IconPackage, IconSecurePrivacy, PoweredByStripe } from "@/components/icons"
import { useMeasure } from "@uidotdev/usehooks"

export const CustomerOrdersContent = () => {
    const { data, isLoading } = useGetCustomerOrders({})
    return (
        <div className="flex flex-col gap-6">
            <h1 className="font-extrabold text-2xl font-sora">Orders</h1>
            <div className="grid items-start gap-8 lg:grid-cols-12">
                {
                    isLoading ? (
                        <div className="grid gap-6 lg:col-span-8 xl:col-span-9">
                        {
                            Array.from({ length: 6 }).map((_, index) => (
                                <div key={index}>
                                    <Skeleton className="h-60" />
                                </div>
                            ))
                        }
                        </div>
                    ) : (!isLoading && data && ((data?.data as GetCustomerOrderResponse[]).length > 0)) ? (
                        <div className="flex flex-col gap-6 lg:col-span-8 xl:col-span-9">
                        {
                            (data?.data as GetCustomerOrderResponse[]).map((order) => (
                                <OrderAccordion key={order.order_ref} order={order} />
                            ))
                        }
                        </div>
                    ) : (
                        <div className="flex flex-col items-center w-full max-w-md text-center mx-auto py-24 lg:col-span-8 xl:col-span-9">
                            <div className="bg-orange-5 rounded-full grid place-content-center size-9 inset-ring-1 inset-ring-orange-2/50 mb-4">
                                <IconPackage className="size-4.5 text-orange-2" />
                            </div>
                            <span className="text-grey-dark-0 text-base font-semibold">Your order history is empty</span>
                            <p className="text-grey-dark-2 text-sm font-normal">Start exploring meals and place your first order—it’ll show up here.</p>
                            <Button size="default" className="mt-4" asChild><Link href="/meals">Order Meals</Link></Button>
                        </div>
                    )
                }
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
                            <Button variant="link" size="smallest" asChild><Link href="/contact-us">Contact Us</Link></Button>
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
        </div>
    )
}

const OrderAccordion = ({ order }: { order: GetCustomerOrderResponse }) => {
    const [ref, bounds] = useMeasure()
    const [isCollapsed, setIsCollapsed] = useState(false)
    return (
        <div key={order.order_ref} className="grid rounded-md ring-1 ring-outline overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-grey-dark-4 gap-5 sm:gap-0 p-3">
                <div className="flex items-center gap-5 order-2 sm:order-1">
                    <div className="grid gap-0.5">
                        <span className="text-2xs text-grey-dark-2">ORDER PLACED</span>
                        <p className="text-sm font-medium text-grey-dark-1">
                            {dateToRender(order.order_placed as Date)} • {format(order.order_placed, "hh:mmaaa")}
                        </p>
                    </div>
                    <div className="grid gap-0.5">
                        <span className="text-2xs text-grey-dark-2">TOTAL</span>
                        <p className="text-sm font-medium text-grey-dark-1">
                        {Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 2, minimumFractionDigits: 0 }).format((order.items)?.[0]?.amount_paid)}
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-3 order-1 sm:order-2">
                    <span className="text-sm text-grey-dark-2 text-right">Order #{order.order_ref}</span>
                    <Button variant="secondary" size="icon-sm" onClick={() => setIsCollapsed((prev) => !prev)}>
                        <IconArrowDown />
                    </Button>
                </div>
            </div>
            <motion.div 
                initial={{ height: 0, opacity: 0 }} 
                animate={{ height: !isCollapsed ? (bounds.height || 0) : 0, opacity: 1 }} 
                exit={{ height: 0, opacity: 0}} 
                transition={{ ease: [.455, .03, .515, .955], duration: isCollapsed ? 0.15 : 0.3 }}
                style={{ willChange: "height" }}
                className="overflow-clip"
            >
                <div ref={ref} className="relative overflow-clip">
                    <AnimatePresence mode="sync">
                        {
                            !isCollapsed && (
                                <motion.div key={`Order-${order.order_ref}`} className="flex flex-col gap-3 p-3">
                                {
                                    order.items.map((item) => (
                                        <OrderItem key={item.menu_id} item={item} />
                                    ))
                                }
                                </motion.div>
                            )
                        }
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    )
}