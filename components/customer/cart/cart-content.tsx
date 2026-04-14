"use client";

import { useMemo } from "react";
import { CartItem } from "./cart-item";
import { useCart } from "@/context/use-cart";
import { Button } from "@/components/ui/button";
import { PickupDetails } from "./pickup-details";
import { Spinner } from "@/components/ui/spinner";
import { CheckoutButton } from "./checkout-button";
import { Checkbox } from "@/components/ui/checkbox";
import { useGetCart } from "@/services/queries/use-orders";
import { usePickupDetailsForm } from "@/hooks/use-pickup-details";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconHandHeart, IconLock, IconPackage, IconSecurePrivacy, IconShoppingCart, IconTrashSimple, PoweredByStripe } from "@/components/icons";
import Link from "next/link";
import { useEmptyCart, useRemoveCartItem } from "@/services/mutations/use-orders";

export const CartContent = () => {
    const { selectedCartItems, toggleCartSelections } = useCart()
    const { data, isLoading } = useGetCart()
    const form = usePickupDetailsForm(data?.data.cart_id || "")
    const { mutate: clearCart, isPending: isClearing } = useEmptyCart()
    const { mutate, isPending } = useRemoveCartItem()

    const orderSummary = useMemo(() => {
        return [
            {
                label: "Order Total",
                amount: Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 2 }).format((data?.data?.data || []).reduce((sum, num) => {
                    return sum + num.order_amount;
                }, 0))
            },
            {
                label: "Total",
                amount: Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 2 }).format((data?.data?.data || []).reduce((sum, num) => {
                    return sum + num.order_amount;
                }, 0))
            },
        ]
    }, [data?.data?.data])

    const deleteCartItems = () => {
        if (isPending || isClearing || (selectedCartItems.length === 0)) return;
        if (selectedCartItems.length === 1) {
            mutate({ menu_id: selectedCartItems[0] })
        } else {
            clearCart({ menu_id: selectedCartItems.join(",") })
        }
    }

    return (
        <>
        {
            isLoading ? (
                <div className="flex flex-col justify-center h-full">
                    <Spinner className="size-5 mx-auto" />
                </div>
            ) : (!isLoading && data?.data?.cart_id) ? (
                <div className="flex flex-col gap-8">
                    <h1 className="font-extrabold text-2xl font-sora">Cart</h1>
                    <div className="grid items-start gap-8 lg:grid-cols-12">
                        <div className="flex flex-col gap-6 lg:col-span-8 xl:col-span-9">
                            <Card size="sm">
                                <CardContent className="space-y-4">
                                    <CardHeader className="px-0!">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-sm font-normal text-grey-dark-0 uppercase">Cart items</CardTitle>
                                            <div className="flex items-center justify-end gap-3">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Checkbox
                                                        id="select-all"
                                                        aria-label="Select All"
                                                        checked={((selectedCartItems.length < (data?.data?.data || [])?.length) && selectedCartItems.length > 0) ? "indeterminate" : !!(selectedCartItems.length === (data?.data?.data || [])?.length)}
                                                        onCheckedChange={() => toggleCartSelections((data?.data?.data || []).map((item) => item.menu_id))}
                                                    />
                                                    <label htmlFor="select-all" className="font-medium text-xs text-grey-dark-3">Select All</label>
                                                </div>
                                                {
                                                    (selectedCartItems.length > 0) && (
                                                        <Button 
                                                            type="button" 
                                                            size="icon-xs"  
                                                            variant="tertiary" 
                                                            onClick={deleteCartItems}
                                                            disabled={isPending || isClearing || (selectedCartItems.length === 0)}
                                                        >
                                                            {(isPending || isClearing) ? (<Spinner />) : (<IconTrashSimple />)}
                                                        </Button>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <ul className="space-y-4">
                                    {
                                        data?.data?.data?.map((item) => (
                                            <li key={item.menu_id}>
                                                <CartItem item={item} />
                                            </li>
                                        ))
                                    }
                                    </ul>
                                </CardContent>
                            </Card>
                            <PickupDetails form={form} />
                        </div>
                        <div className="flex flex-col gap-6 lg:col-span-4 xl:col-span-3">
                            <div className="flex flex-col gap-6 p-5 rounded-2xl bg-grey-dark-4">
                                <div className="grid gap-1">
                                    <span className="font-semibold text-base text-grey-dark-0">Order Summary</span>
                                    <p className="text-xs text-grey-dark-3">Please refer to your final actual payment amount at checkout</p>
                                </div>
                                <ul className="space-y-2">
                                {
                                    orderSummary.map((item, index) => (
                                        <li key={index}>
                                            <div data-last={index === 1} className="flex items-center justify-between group">
                                                <span className="text-xs text-grey-dark-2 group-data-[last=true]:font-medium">{item.label}</span>
                                                <span className="text-right text-xs text-grey-dark-2 group-data-[last=true]:text-grey-dark-0 font-medium group-data-[last=true]:text-sm">{item.amount}</span>
                                            </div>
                                        </li>
                                    ))
                                }
                                </ul>
                                <CheckoutButton form={form} />
                            </div>
                            <div className="flex flex-col gap-7">
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
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center w-full max-w-md text-center mx-auto py-12 lg:py-24">
                    <div className="bg-orange-5 rounded-full grid place-content-center size-9 inset-ring-1 inset-ring-orange-2/50 mb-4">
                        <IconShoppingCart className="size-4.5 text-orange-2" />
                    </div>
                    <span className="text-grey-dark-0 text-base font-semibold">Your cart is empty</span>
                    <p className="text-grey-dark-2 text-sm font-normal">Add meals from vendors to get started. Once you’ve made your selections, they’ll appear here for checkout.</p>
                    <Button size="default" className="mt-4" asChild><Link href="/meals">Add Cuisine</Link></Button>
                </div>
            )
        }
        </>
    )
}