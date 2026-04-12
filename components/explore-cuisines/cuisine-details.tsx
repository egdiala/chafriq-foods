"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Content } from "../content";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { formatHours } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { Separator } from "../ui/separator";
import { StoreCard } from "../explore-cooks/store-card";
import { IconHourglass } from "../icons/icon-hourglass";
import { RatingsAndReview } from "../explore-cooks/ratings-and-review";
import { StoreAvailability } from "../explore-cooks/store-availability";
import { useGetCook, useGetMeal, useGetRatings } from "@/services/queries/use-explore";
import { IconBowlFood, IconBowlSteam, IconCookingPot, IconCurrencyDollar, IconStarFull } from "../icons";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { OrderFoodDialog } from "./order-food-dialog";

type Props = {
    mealId: string;
}

export const CuisineDetails = ({ mealId }: Props) => {
    const [open, setOpen] = useState(false)
    const { data: cookRatings, isLoading: isLoadingCookRatings } = useGetRatings({ menu_id: mealId })
    const { data, isLoading } = useGetMeal({ meal_id: mealId, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone })
    const { data: cookData, isLoading: isLoadingCook } = useGetCook({ cook_id: data?.data?.cook_id || "", timezone: Intl.DateTimeFormat().resolvedOptions().timeZone })
    const [quantity, setQuantity] = useState(1)

    const increment = () => {
        setQuantity((qty) => qty + 1);
    }

    const decrease = () => {
        if (quantity === (data?.data?.min_order || 1)) return;
        setQuantity((qty) => qty - 1)
    }

    useEffect(() => {
        if (data) {
            setQuantity(data?.data?.min_order)
        }
    }, [data])

    return (
        <section id="cuisine-details" className="relative bg-white overflow-hidden">
            {
                (isLoading || isLoadingCook || isLoadingCookRatings) ? (
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
                                            <Link href="/cooks">Explore Cooks</Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>   
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink asChild>
                                            <Link href={`/cooks/${data?.data?.cook_id}`}>{cookData?.data?.business_name}</Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>   
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>{data?.data?.menu_name}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                            <div className="grid sm:grid-cols-4 gap-6">
                                <div className="grid gap-8 sm:col-span-3">
                                    <div className="flex flex-col gap-6">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
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
                                                            <IconStarFull /> {data?.data?.rating?.toFixed(1)}
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
                                                            {Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 2 }).format(data?.data?.menu_amount || 0)}
                                                            /{data?.data?.quantity_unit}
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
                                                            MOQ
                                                        </div>
                                                        <p className="text-sm font-semibold text-grey-dark-0">{data?.data?.min_order} {data?.data?.quantity_unit}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid gap-7 sm:gap-8 content-start w-full sm:max-w-74">
                                                <div className="flex items-center gap-1 p-1 w-full sm:max-w-52.5 inset-ring-1 inset-ring-outline rounded-full">
                                                    <Button size="icon-sm" variant="secondary" type="button" disabled={quantity === (data?.data?.min_order || 1)} onClick={decrease}><Minus /></Button>
                                                    <div className="flex items-center justify-center h-10 flex-1 rounded-full bg-input-field">
                                                            <span className="text-center text-sm text-grey-dark-0">
                                                                {quantity} {data?.data?.quantity_unit.toLowerCase()}{quantity === 1 ? "" : "s"}
                                                            </span>
                                                    </div>
                                                    <Button size="icon-sm" variant="secondary" type="button" onClick={increment}><Plus /></Button>
                                                </div>
                                                <Button type="button" onClick={() => setOpen(true)}><IconCookingPot className="size-6" /> Order Cuisine</Button>
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
                                                        <span className="text-xs text-grey-dark-3">Allergens that are ingredients in this cuisine</span>
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
                                    {
                                        ((cookRatings?.data || []).length > 0) && (
                                            <>
                                            <Separator />
                                            <div className="flex flex-col gap-8">
                                                <h2 className="font-semibold text-xl text-grey-dark-0">Reviews & Ratings ({cookRatings?.data.length})</h2>
                                                {
                                                    cookRatings?.data.map((ratingData, index) => (
                                                        <RatingsAndReview rating={ratingData} key={index} />
                                                    ))
                                                }
                                            </div>
                                            </>
                                        )
                                    }
                                </div>
                                <div className="grid gap-6 content-start">
                                    <StoreCard cookId={data?.data?.cook_id || ""} />
                                    <StoreAvailability cookId={data?.data?.cook_id || ""} />
                                </div>
                            </div>
                        </div>
                    </Content>
                )
            }
            <OrderFoodDialog quantity={quantity} meal={data?.data} open={open} setOpen={setOpen} />
        </section>
    )
}