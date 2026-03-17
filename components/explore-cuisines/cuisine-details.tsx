"use client";

import Link from "next/link";
import { Content } from "../content";
import { Separator } from "../ui/separator";
import { StoreCard } from "../explore-cooks/store-card";
import { RatingsAndReview } from "../explore-cooks/ratings-and-review";
import { StoreAvailability } from "../explore-cooks/store-availability";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Button } from "../ui/button";
import { IconBowlFood, IconBowlSteam, IconCookingPot, IconCurrencyDollar, IconStarFull } from "../icons";
import { Minus, Plus } from "lucide-react";
import { IconHourglass } from "../icons/icon-hourglass";

const MAIN_ALLERGIES = ["peanuts", "tree nuts", "milk (dairy)", "egg", "wheat/grain", "soy", "fish", "shellfish", "sesame"]

export const CuisineDetails = () => {
    return (
        <section id="cuisine-details" className="relative bg-white overflow-hidden">
            <Content>
                <div className="flex flex-col gap-6">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/explore-cooks">Explore Cooks</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>   
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/explore-cooks/1">Jollof Rice Kitchen</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>   
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Jollof Rice & Plantain</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="grid sm:grid-cols-4 gap-6">
                        <div className="grid gap-8 sm:col-span-3">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                    <div className="order-2 sm:order-1 flex sm:flex-col gap-3">
                                    {
                                        Array.from({ length: 6 }).map((_, index) => (
                                            <div key={index} className="rounded overflow-hidden aspect-video bg-orange-1 flex-1 sm:flex-none h-12 w-12">
                                                <img src="https://images.unsplash.com/photo-1432139555190-58524dae6a55?q=80&w=2676&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="food" className="object-cover object-center h-12" />
                                            </div>
                                        ))
                                    }
                                    </div>
                                    <div className="relative w-full h-auto sm:h-87 order-1 sm:order-2 overflow-hidden rounded-lg">
                                        <Carousel opts={{ loop: true }} className="group rounded-lg overflow-hidden w-full">
                                            <CarouselContent className="h-auto sm:h-87">
                                                {Array.from({ length: 5 }).map((_, index) => (
                                                <CarouselItem key={index}>
                                                    <div className="rounded-lg overflow-hidden aspect-video bg-orange-1">
                                                        <img src="https://images.unsplash.com/photo-1432139555190-58524dae6a55?q=80&w=2676&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="food" />
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
                                            <h1 className="text-base sm:text-2xl font-semibold sm:font-extrabold text-grey-dark-0">Jollof Rice & Plantain</h1>
                                            <div className="flex items-center gap-5">
                                                <div className="flex items-center gap-2 text-sm text-grey-dark-2 [&>svg]:text-yellow-2">
                                                    <IconStarFull /> 4.5
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-grey-dark-2 [&>svg]:text-orange-2">
                                                    <IconBowlSteam /> {"> 20 Orders"}
                                                </div>
                                            </div>
                                            <p className="text-sm text-grey-dark-3">1 Jollof Rice, 1 Fried Chicken, 2 Beef Skewers, and 1 Plantain.</p>
                                        </div>
                                        <div className="flex items-center flex-wrap gap-5">
                                            <div className="flex flex-col p-3 gap-2 bg-grey-dark-4 rounded-xl max-w-40.5 w-full">
                                                <div className="text-sm text-grey-dark-2 [&>svg]:text-orange-2 [&>svg]:size-3.5 grid gap-1">
                                                    <IconCurrencyDollar />
                                                    Amount
                                                </div>
                                                <p className="text-sm font-semibold text-grey-dark-0">$34.34/plate</p>
                                            </div>
                                            <div className="flex flex-col p-3 gap-2 bg-grey-dark-4 rounded-xl max-w-40.5 w-full">
                                                <div className="text-sm text-grey-dark-2 [&>svg]:text-orange-2 [&>svg]:size-3.5 grid gap-1">
                                                    <IconHourglass />
                                                    Prep Time
                                                </div>
                                                <p className="text-sm font-semibold text-grey-dark-0">2 hrs</p>
                                            </div>
                                            <div className="flex flex-col p-3 gap-2 bg-grey-dark-4 rounded-xl max-w-40.5 w-full">
                                                <div className="text-sm text-grey-dark-2 [&>svg]:text-orange-2 [&>svg]:size-3.5 grid gap-1">
                                                    <IconBowlFood />
                                                    MOQ
                                                </div>
                                                <p className="text-sm font-semibold text-grey-dark-0">1 Plate</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid gap-7 sm:gap-8 content-start w-full sm:max-w-74">
                                        <div className="flex items-center gap-1 p-1 w-full sm:max-w-52.5 inset-ring-1 inset-ring-outline rounded-full">
                                            <Button size="icon-sm" variant="secondary"><Minus /></Button>
                                            <div className="flex items-center justify-center h-10 flex-1 rounded-full bg-input-field">
                                                <span className="text-center text-sm text-grey-dark-0">1 plate</span>
                                            </div>
                                            <Button size="icon-sm" variant="secondary"><Plus /></Button>
                                        </div>
                                        <Button><IconCookingPot className="size-6" /> Order Cuisine</Button>
                                    </div>
                                </div>
                            </div>
                            <Separator />
                            <div className="flex flex-col gap-3">
                                <h2 className="font-semibold text-xl text-grey-dark-0">Allergy Information</h2>
                                <div className="flex flex-col gap-5">
                                    <div className="grid gap-2">
                                        <span className="text-xs text-grey-dark-3">Allergens that are ingredients in this cuisine</span>
                                        <div className="flex items-center gap-4 flex-wrap"> 
                                            {MAIN_ALLERGIES.map((item, i) => {
                                                return (
                                                    <div key={i} className="capitalize inline-flex text-xs rounded-full px-3 py-1 inset-ring-1 inset-ring-grey-dark-4 bg-grey-dark-4 text-grey-dark-2">
                                                        {item}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <span className="text-xs text-grey-dark-3">May contain traces (cross-contamination possible)</span>
                                        <div className="flex items-center gap-4 flex-wrap"> 
                                            {MAIN_ALLERGIES.map((item, i) => {
                                                return (
                                                    <div key={i} className="capitalize inline-flex text-xs rounded-full px-3 py-1 inset-ring-1 inset-ring-grey-dark-4 bg-grey-dark-4 text-grey-dark-2">
                                                        {item}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <span className="text-xs text-grey-dark-3">Allergy Notes</span>
                                        <p className="text-xs text-grey-dark-3"> 
                                        Lorem ipsum dolor sit amet consectetur. Erat in interdum accumsan et amet arcu rhoncus volutpat sed. Et integer adipiscing metus eu aenean aliquam sit pellentesque. Suspendisse vel odio accumsan nec.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <Separator />
                            <div className="flex flex-col gap-8">
                                <h2 className="font-semibold text-xl text-grey-dark-0">Reviews & Ratings (15)</h2>
                                {
                                    Array.from({ length: 4 }).map((_, index) => (
                                        <RatingsAndReview key={index} />
                                    ))
                                }
                            </div>
                        </div>
                        <div className="grid gap-6 content-start">
                            <StoreCard />
                            <StoreAvailability />
                        </div>
                    </div>
                </div>
            </Content>
        </section>
    )
}