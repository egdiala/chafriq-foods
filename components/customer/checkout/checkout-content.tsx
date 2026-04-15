"use client";

import { useEffect, useMemo, useState } from "react";
import { PaymentForm } from "./payment-form";
import { useCart } from "@/context/use-cart";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutItem } from "./checkout-item";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useGetCart } from "@/services/queries/use-orders";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StripeElementWrapper } from "@/components/vendor/profile/stripe-element-wrapper";
import { IconBookOpenText, IconHandHeart, IconLock, IconPackage, IconPhone, IconSecurePrivacy, IconUser, PoweredByStripe } from "@/components/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const CheckoutContent = () => {
    const router = useRouter()
    const { checkoutInfo } = useCart()
    const [open, setOpen] = useState(false)
    const { data, isLoading } = useGetCart()
    const [paymentData, setPaymentData] = useState<CheckoutResponse | null>(null)

    const orderSummary = useMemo(() => {
        return [
            {
                label: "Cuisine Total",
                amount: Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 2 }).format((data?.data?.data || []).reduce((sum, num) => {
                    return sum + num.order_amount;
                }, 0))
            },
            { label: "Tax", amount: "$0" },
            {
                label: "Total",
                amount: Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 2 }).format((data?.data?.data || []).reduce((sum, num) => {
                    return sum + num.order_amount;
                }, 0))
            },
        ]
    }, [data?.data?.data])

    useEffect(() => {
        if (checkoutInfo !== null) {
            setPaymentData(checkoutInfo)
        }
    }, [checkoutInfo])

    useEffect(() => {
        if (!data?.data?.cart_id) {
            router.replace("/customer/cart");
        }
    }, [data?.data?.cart_id, router]);

    return (
        <>
        {
            isLoading ? (
                <div className="flex flex-col justify-center h-full">
                    <Spinner className="size-5 mx-auto" />
                </div>
            ) : (
                <div className="flex flex-col gap-8">
                    <h1 className="font-extrabold text-2xl font-sora">Checkout</h1>
                    <div className="grid items-start gap-8 lg:grid-cols-12">
                        <div className="flex flex-col gap-6 lg:col-span-8 xl:col-span-9">
                            <Card size="sm">
                                <CardContent className="space-y-4">
                                    <CardHeader className="px-0!">
                                        <CardTitle className="text-sm font-normal text-grey-dark-0 uppercase">checkout items</CardTitle>
                                    </CardHeader>
                                    <ul className="space-y-4">
                                    {
                                        data?.data?.data?.map((item) => (
                                            <li key={item.menu_id}>
                                                <CheckoutItem item={item} />
                                            </li>
                                        ))
                                    }
                                    </ul>
                                </CardContent>
                            </Card>
                            <Card size="sm">
                                <CardContent className="space-y-4">
                                    <CardHeader className="px-0!">
                                        <CardTitle className="text-sm font-normal text-grey-dark-0 uppercase">pickup details</CardTitle>
                                    </CardHeader>
                                    <ul className="space-y-4">
                                        <li>
                                            <div className="grid gap-1">
                                                <div className="flex items-center gap-1.5">
                                                    <IconUser className="size-3.5 text-orange-2" />
                                                    <span className="font-medium text-sm text-grey-dark-2">Recipient Name</span>
                                                </div>
                                                <p className="text-sm text-grey-dark-3">{data?.data?.receiver_name}</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="grid gap-1">
                                                <div className="flex items-center gap-1.5">
                                                    <IconPhone className="size-3.5 text-orange-2" />
                                                    <span className="font-medium text-sm text-grey-dark-2">Recipient Phone</span>
                                                </div>
                                                <p className="text-sm text-grey-dark-3">{formatPhoneNumberIntl(`+${data?.data?.receiver_phone}`)}</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="grid gap-1">
                                                <div className="flex items-center gap-1.5">
                                                    <IconBookOpenText className="size-3.5 text-orange-2" />
                                                    <span className="font-medium text-sm text-grey-dark-2">Pickup Note</span>
                                                </div>
                                                <p className="text-sm text-grey-dark-3">{data?.data?.pickup_note}</p>
                                            </div>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
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
                                            <div data-last={index === 2} className="flex items-center justify-between group">
                                                <span className="text-xs text-grey-dark-2 group-data-[last=true]:font-medium">{item.label}</span>
                                                <span className="text-right text-xs text-grey-dark-2 group-data-[last=true]:text-grey-dark-0 font-medium group-data-[last=true]:text-sm">{item.amount}</span>
                                            </div>
                                        </li>
                                    ))
                                }
                                </ul>
                                <Button type="button" onClick={() => setOpen(true)} disabled={checkoutInfo === null}>Proceed to Pay</Button>
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
                    {(open && paymentData) && <StripePayment data={paymentData} open={open} setOpen={setOpen} />}
                </div>
            )
        }
        </>
    )
}

interface IStripePayment {
  data: CheckoutResponse;
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const StripePayment = ({ data, open, setOpen }: IStripePayment) => {
  const { app_secret, client_secret, payment_id } = data;
  const stripePromise = loadStripe(app_secret);

  return (
    <StripeElementWrapper
      client_secret={client_secret}
      stripePromise={stripePromise}
    >
      <PaymentForm
        open={open}
        setOpen={setOpen}
        transactionId={payment_id}
        secret={client_secret}
      />
    </StripeElementWrapper>
  );
};