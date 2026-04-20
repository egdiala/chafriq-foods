"use client";

import Link from "next/link";
import { format } from "date-fns";
import { RateOrder } from "./rate-order";
import { useUser } from "@/context/use-user";
import { CancelOrder } from "./cancel-order";
import { Content } from "@/components/content";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useEffect, useMemo, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { dateToRender, formatHours } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import { useGetCustomerOrder } from "@/services/queries/use-orders";
import { ORDER_STATUS, ORDER_STATUS_CLASSES } from "@/components/vendor/orders/order-card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { IconBowlFood, IconBowlSteam, IconClose, IconCookingPot, IconCurrencyDollar, IconDot, IconHourglass, IconLock, IconStarFull } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ReportOrder } from "./report-order";


type Props = {
    orderId: string;
}

export const OrderDetails = ({ orderId }: Props) => {
    const [open, setOpen] = useState(false)
    const [openReport, setOpenReport] = useState(false)
    const [openRating, setOpenRating] = useState(false)
    const { data, isLoading } = useGetCustomerOrder(orderId)
    const [quantity, setQuantity] = useState(1)
    const { user: userObj } = useUser()

    const user = userObj as CustomerProfileResponse;

    const increment = () => {
        setQuantity((qty) => qty + 1);
    }

    const decrease = () => {
        if (quantity === (data?.data?.quantity_size || 1)) return;
        setQuantity((qty) => qty - 1)
    }

    useEffect(() => {
        if (data) {
            setQuantity(data?.data?.quantity_size)
        }
    }, [data])

    const orderSummary = useMemo(() => {
        return [
            {
                label: "Total Meals",
                amount: Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 2 }).format(data?.data?.amount_total || 0)
            },
            { label: "Tax", amount: "$0" },
            {
                label: "Total",
                amount: Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 2 }).format(data?.data?.amount_total || 0)
            },
        ]
    }, [data?.data])

    return (
        <section id="cuisine-details" className="relative bg-white overflow-hidden">
            {
                (isLoading) ? (
                    <div className="flex flex-col justify-center h-[50dvh]">
                        <Spinner className="size-5 mx-auto" />
                    </div>
                ) : (
                    <Content>
                        <div className="flex flex-col gap-6">
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink asChild>
                                            <Link href="/customer/orders">Orders</Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem> 
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>#{data?.data?.order_ref}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                            <div className="grid sm:grid-cols-3 gap-6 relative">
                                <div className="grid gap-8 sm:col-span-2">
                                    <div className="flex flex-col gap-6">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                            {
                                                ((data?.data?.img_data || [])?.length > 1) && (
                                                    <div className="order-2 sm:order-1 flex sm:flex-col sm:h-full gap-3">
                                                    {
                                                        data?.data?.img_data?.map((media, index) => (
                                                            <div key={index} className="rounded overflow-hidden aspect-video bg-orange-1 flex-1 sm:flex-none h-12 w-12">
                                                            {
                                                                media.mime_type.startsWith("image") ? (
                                                                    <img src={media?.file_url} alt={index.toString()} className="object-cover object-center w-full h-12" />
                                                                ): (
                                                                    <video
                                                                        autoPlay={false}
                                                                        loop
                                                                        muted
                                                                        playsInline
                                                                        preload="auto"
                                                                        className="h-12 w-full object-cover"
                                                                    >
                                                                        <source src={media?.file_url} type={media?.mime_type} />
                                                                    </video>
                                                                )
                                                            }
                                                            </div>
                                                        ))
                                                    }
                                                    </div>
                                                )
                                            }
                                            <div className="relative w-full h-auto sm:h-100 order-1 sm:order-2 overflow-hidden rounded-lg">
                                                <Carousel opts={{ loop: true }} className="group rounded-lg overflow-hidden w-full">
                                                    <CarouselContent className="h-auto sm:h-100">
                                                        {data?.data?.img_data?.map((media, index) => (
                                                        <CarouselItem key={index}>
                                                            <div className="rounded-lg overflow-hidden aspect-video bg-orange-1">
                                                            {
                                                                media.mime_type.startsWith("image") ? (
                                                                    <img src={media?.file_url} alt={index.toString()} className="object-cover object-center w-full h-full" />
                                                                ): (
                                                                    <video
                                                                        autoPlay
                                                                        loop
                                                                        muted
                                                                        playsInline
                                                                        preload="auto"
                                                                        className="h-full w-full object-cover"
                                                                    >
                                                                        <source src={media?.file_url} type={media?.mime_type} />
                                                                    </video>
                                                                )
                                                            }
                                                            </div>
                                                        </CarouselItem>
                                                        ))}
                                                    </CarouselContent>
                                                    <CarouselPrevious className="group-hover:start-4" />
                                                    <CarouselNext className="group-hover:end-4" />
                                                </Carousel>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-8">
                                            <div className="flex flex-col gap-5">
                                                <div className="flex flex-col gap-3">
                                                    <h1 className="text-base sm:text-2xl font-semibold sm:font-extrabold text-grey-dark-0">{data?.data?.menu_name}</h1>
                                                    <div className="flex items-center gap-5">
                                                        <div className="flex items-center gap-2 text-sm text-grey-dark-2 [&>svg]:text-yellow-2">
                                                            <IconStarFull /> {data?.data?.customer_rating_count?.toFixed(1)}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm text-grey-dark-2 [&>svg]:text-orange-2">
                                                            <IconBowlSteam /> {"> 20 Orders"}
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-grey-dark-3">{data?.data?.menu_content}</p>
                                                </div>
                                                <div className="flex items-center flex-wrap gap-5">
                                                    <div className="flex flex-col p-3 gap-2 bg-grey-dark-4 rounded-xl max-w-40.5 w-full">
                                                        <div className="text-sm text-grey-dark-2 [&>svg]:text-orange-2 [&>svg]:size-3.5 grid gap-1">
                                                            <IconCurrencyDollar />
                                                            Amount
                                                        </div>
                                                        <p className="text-sm font-semibold text-grey-dark-0">
                                                            {Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 2 }).format(data?.data?.amount_total || 0)}
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-col p-3 gap-2 bg-grey-dark-4 rounded-xl max-w-40.5 w-full">
                                                        <div className="text-sm text-grey-dark-2 [&>svg]:text-orange-2 [&>svg]:size-3.5 grid gap-1">
                                                            <IconHourglass />
                                                            Prep Time
                                                        </div>
                                                        <p className="text-sm font-semibold text-grey-dark-0">{formatHours(data?.data?.cooking_hour || 0)}</p>
                                                    </div>
                                                    <div className="flex flex-col p-3 gap-2 bg-grey-dark-4 rounded-xl max-w-40.5 w-full">
                                                        <div className="text-sm text-grey-dark-2 [&>svg]:text-orange-2 [&>svg]:size-3.5 grid gap-1">
                                                            <IconBowlFood />
                                                            Quantity Ordered
                                                        </div>
                                                            <p className="text-sm font-semibold text-grey-dark-0">{data?.data?.quantity_size} {data?.data?.quantity_unit}{data?.data?.quantity_size === 1 ? "" : "s"}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid gap-7 sm:gap-8 content-start w-full sm:max-w-74">
                                                {/* <div className="flex items-center gap-1 p-1 w-full sm:max-w-52.5 inset-ring-1 inset-ring-outline rounded-full">
                                                    <Button size="icon-sm" variant="secondary" type="button" disabled={quantity === (data?.data?.min_order || 1)} onClick={decrease}><Minus /></Button>
                                                    <div className="flex items-center justify-center h-10 flex-1 rounded-full bg-input-field">
                                                            <span className="text-center text-sm text-grey-dark-0">
                                                                {quantity} {data?.data?.quantity_unit.toLowerCase()}{quantity === 1 ? "" : "s"}
                                                            </span>
                                                    </div>
                                                    <Button size="icon-sm" variant="secondary" type="button" onClick={increment}><Plus /></Button>
                                                </div> */}
                                                <Button type="button" asChild>
                                                    <Link href={`/meals/${data?.data?.menu_id}`}>
                                                        <IconCookingPot className="size-6" /> Order Again
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className="flex flex-col gap-3">
                                        <h2 className="font-semibold text-xl text-grey-dark-0">Allergy Information</h2>
                                        <div className="flex flex-col gap-5">
                                            {
                                                !!data?.data?.allergy_list?.length && (
                                                    <div className="grid gap-2">
                                                        <span className="text-xs text-grey-dark-3">Allergens that are ingredients in this meal</span>
                                                        <div className="flex items-center gap-4 flex-wrap"> 
                                                            {data?.data?.allergy_list.map((item, i) => {
                                                                return (
                                                                    <div key={i} className="capitalize inline-flex text-xs rounded-full px-3 py-1 inset-ring-1 inset-ring-grey-dark-4 bg-grey-dark-4 text-grey-dark-2">
                                                                        {item}
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            {
                                                !!data?.data?.allergy_trace?.length && (
                                                    <div className="grid gap-2">
                                                        <span className="text-xs text-grey-dark-3">May contain traces (cross-contamination possible)</span>
                                                        <div className="flex items-center gap-4 flex-wrap"> 
                                                            {data?.data?.allergy_trace.map((item, i) => {
                                                                return (
                                                                    <div key={i} className="capitalize inline-flex text-xs rounded-full px-3 py-1 inset-ring-1 inset-ring-grey-dark-4 bg-grey-dark-4 text-grey-dark-2">
                                                                        {item}
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>  
                                                )
                                            }
                                            <div className="grid gap-2">
                                                <span className="text-xs text-grey-dark-3">Allergy Notes</span>
                                                <p className="text-xs text-grey-dark-3"> 
                                                {data?.data?.allegen_note || "-"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className="grid gap-1 lg:max-w-3/4">
                                        <div className="flex items-center gap-1">
                                            <IconLock className="size-3.5 text-orange-2" />
                                            <span className="font-medium text-xs text-grey-dark-2">Secure privacy</span>
                                        </div>
                                        <p className="text-xs text-grey-dark-3">Protecting your privacy is important to us! Please be assured that your information will be kept secured and uncompromised. We will only use your information in accordance with our privacy policy to provide and improve our services to you.</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 sticky top-0">
                                    <span className="font-semibold text-base text-grey-dark-0">Order Summary</span>
                                    <div className="flex flex-col gap-5 p-4 rounded-2xl bg-grey-dark-4">
                                        <div className="grid gap-1">
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold text-xs text-grey-dark-2">Order ID</span>
                                                <Badge variant={ORDER_STATUS_CLASSES[data?.data?.order_status as OrderStatus] as unknown as VariantProps<typeof badgeVariants>["variant"]} className="capitalize [&>svg]:size-1.5!">
                                                    <IconDot /> {ORDER_STATUS[data?.data?.order_status as OrderStatus]}
                                                </Badge>
                                            </div>
                                            <p className="font-normal text-xs text-grey-dark-2">#{data?.data?.order_ref}</p>
                                        </div>
                                        <div className="grid gap-1">
                                            <span className="font-bold text-xs text-grey-dark-2">Paid On</span>
                                            <p className="font-normal text-xs text-grey-dark-2">
                                                {dateToRender(data?.data?.order_paid_at as unknown as Date)} • {format(data?.data?.order_paid_at as unknown as Date, "hh:mmaaa")}
                                            </p>
                                        </div>
                                        <div className="grid gap-1">
                                            <span className="font-bold text-xs text-grey-dark-2">Delivered Date/Time</span>
                                            <p className="font-normal text-xs text-grey-dark-2">
                                                {dateToRender(data?.data?.order_end_date as unknown as Date)} • {format(data?.data?.order_end_date as unknown as Date, "hh:mmaaa")}
                                            </p>
                                        </div>
                                        <div className="grid gap-1">
                                            <span className="font-bold text-xs text-grey-dark-2">Delivered To</span>
                                            <p className="font-medium text-xs text-grey-dark-2">
                                                {data?.data?.pickup_data.receiver_name}
                                            </p>
                                            <p className="font-medium text-xs text-grey-dark-2">
                                                {formatPhoneNumberIntl(`+${data?.data?.pickup_data.receiver_phone}`)}
                                            </p>
                                            <p className="font-medium text-xs text-grey-dark-2">
                                                {data?.data?.pickup_data.pickup_note}
                                            </p>
                                        </div>
                                        {
                                            data?.data?.order_status === 1 && (
                                                <Button variant="secondary" className="isolate" type="button" onClick={() => setOpen(true)}>
                                                    <IconClose />
                                                    Cancel Order
                                                </Button>
                                            )
                                        }
                                        {
                                            data?.data?.order_status === 3 && (
                                                <Button variant="secondary" className="isolate" type="button" onClick={() => setOpenRating(true)}>
                                                    <IconStarFull className="text-transparent stroke-orange-2 stroke-1" />
                                                    Leave a Review
                                                </Button>
                                            )
                                        }
                                    </div>
                                    <div className="flex flex-col gap-5 p-4 rounded-2xl bg-grey-dark-4">
                                        <div className="grid gap-1">
                                            <span className="font-bold text-xs text-grey-dark-2">Payment</span>
                                            <p className="text-xs text-grey-dark-3">Pickup arrangements are handled directly between the cook and customer after order confirmation.</p>
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
                                    </div>
                                    {
                                        data?.data && (data?.data?.img_proof?.length > 0) ? (
                                            <Carousel opts={{ loop: true }} className="relative w-full">
                                                <CarouselContent>
                                                    {(data?.data?.img_proof).map((media, index) => (
                                                    <CarouselItem key={index}>
                                                        <div className="rounded-xl overflow-hidden aspect-video bg-orange-1">
                                                            {
                                                                media.mime_type.startsWith("image") ? (
                                                                    <img src={media?.file_url} alt={media?._id} className="object-cover object-center w-full" />
                                                                ): (
                                                                    <video
                                                                        autoPlay
                                                                        loop
                                                                        muted
                                                                        playsInline
                                                                        preload="auto"
                                                                        className="h-full w-full object-cover"
                                                                    >
                                                                        <source src={media?.file_url} type={media?.mime_type} />
                                                                    </video>
                                                                )
                                                            }
                                                        </div>
                                                    </CarouselItem>
                                                    ))}
                                                </CarouselContent>
                                                <CarouselPrevious className="start-4" />
                                                <CarouselNext className="end-4" />
                                            </Carousel>
                                        ) : (
                                            null
                                        )
                                    }
                                    {
                                        data?.data.customer_rating_at && (
                                            <div className="flex flex-col gap-3 p-4 rounded-2xl bg-grey-dark-4">
                                                <span className="font-bold text-xs text-grey-dark-2">Review & Rating</span>
                                                <div className="grid gap-4">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <Avatar className="size-10 sm:size-12 rounded-xl">
                                                                <AvatarImage src={user.avatar} alt={user.full_name} className="size-10 sm:size-12 rounded-xl" />
                                                                <AvatarFallback>{user.full_name.split(" ")[0][0]}{user.full_name.split(" ")[1][0]}</AvatarFallback>
                                                            </Avatar>
                                                            <div className="grid gap-1">
                                                                <h3 className="text-xs font-medium text-grey-dark-0">{user.full_name}</h3>
                                                                <div className="flex items-center">
                                                                    {
                                                                        Array.from({ length: data!.data.customer_rating_count }).map((_, index) => (
                                                                            <IconStarFull key={index} className="text-yellow-2" />
                                                                        ))
                                                                    }
                                                                    {
                                                                        Array.from({ length: 5 - data!.data.customer_rating_count }).map((_, index) => (
                                                                            <IconStarFull key={index} className="text-outline" />
                                                                        ))
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {
                                                            !!(data?.data.customer_rating_at) && (
                                                                <span className="font-normal text-xs sm:text-sx text-grey-dark-2">
                                                                    {format(data?.data.customer_rating_at as unknown as Date, "MMM dd, yyyy")}
                                                                </span>
                                                            )
                                                        }
                                                    </div>
                                                    <p className="font-normal text-xs sm:text-sm text-grey-dark-2">{data?.data?.customer_rating_comment}</p>
                                                </div>
                                            </div> 
                                        )
                                    }
                                    {
                                        data?.data?.order_status === 4 && (
                                            <Button variant="link" className="isolate" type="button" onClick={() => setOpenReport(true)}>
                                                Report Order
                                            </Button>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <CancelOrder open={open} orderId={data?.data?.order_id || ""} setOpen={setOpen} />
                        <RateOrder open={openRating} orderId={data?.data?.order_id || ""} setOpen={setOpenRating} />
                        <ReportOrder open={openReport} orderId={data?.data?.order_id || ""} setOpen={setOpenReport} />
                    </Content>
                )
            }
        </section>
    )
}