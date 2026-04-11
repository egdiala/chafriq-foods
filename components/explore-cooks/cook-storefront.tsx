"use client";

import Link from "next/link";
import { useState } from "react";
import { Content } from "../content";
import { Search } from "lucide-react";
import { StoreCard } from "./store-card";
import { Separator } from "../ui/separator";
import { RatingsAndReview } from "./ratings-and-review";
import { StoreAvailability } from "./store-availability";
import { CuisineCard } from "../explore-cuisines/cuisine-card";
import { useGetCook, useGetRatings } from "@/services/queries/use-explore";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "../ui/input-group";
import { IconArrowDown, IconForkKnife, IconGlobe, IconClockCountdown, IconEggCrack, IconSetup } from "../icons"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";

const filters = [
    { icon: <IconForkKnife />, label: "All Meals" },
    { icon: <IconGlobe />, label: "African" },
    { icon: <IconClockCountdown />, label: "1 hour" },
    { icon: <IconEggCrack />, label: "Vegan" }
]

type Props = {
    cookId: string;
}

export const CookStorefront = ({ cookId }: Props) => {
    const [active, setActive] = useState(0)
    const { data: cookRatings, isLoading: isLoadingCookRatings } = useGetRatings({ cook_id: cookId })
    const { data, isLoading } = useGetCook({ cook_id: cookId, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone })

    if (isLoading || isLoadingCookRatings) {
        return null;
    }

    return (
        <section id="cook-storefront" className="relative isolate bg-white after:hidden after:md:block after:-z-10 after:absolute after:bg-red-2 after:size-67.5 after:rounded-full after:bottom-0 after:top-0 after:-translate-y-1/2 after:right-0 after:translate-x-1/2 after:filter after:blur-[300px] overflow-hidden">
            <Content>
                <div className="flex flex-col gap-12.5">
                    <div className="grid gap-7 justify-items-center w-full md:max-w-151.5 mx-auto">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link href="/">Home</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>   
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Orders</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <InputGroup className="h-13 bg-white">
                            <InputGroupInput placeholder="Search a meal, cuisine " />
                            <InputGroupAddon>
                                <Search className="ml-1" />
                            </InputGroupAddon>
                            <InputGroupAddon align="inline-end">
                                <InputGroupButton variant="default" size="icon-sm">
                                    <IconSetup />
                                </InputGroupButton>
                            </InputGroupAddon>
                        </InputGroup>
                        <div className="flex items-center justify-center flex-wrap gap-3 md:gap-7">
                        {
                            filters.map((filter, index) => (
                                <button data-active={active === index} key={index} type="button" onClick={() => setActive(index)} className="group inline-flex gap-1 items-center inset-ring-1 rounded-full px-3 h-9 bg-grey-dark-4 inset-ring-grey-dark-4 [&>svg]:text-orange-2 data-[active=true]:bg-orange-5 data-[active=true]:inset-ring-orange-2 data-[active=true]:text-orange-2! transition-all duration-200 ease-out">
                                    {filter.icon}
                                    <span className="text-sm text-grey-dark-2 group-data-[active=true]:text-orange-2">{filter.label}</span>
                                    <IconArrowDown className="text-grey-dark-3! group-data-[active=true]:text-orange-2!" />
                                </button>
                            ))
                        }
                        </div>
                    </div>
                    <div className="grid sm:grid-cols-4 gap-6">
                        <div className="grid gap-12.5 sm:col-span-3">
                            <div className="flex flex-col gap-4">
                                <h2 className="font-semibold text-base text-grey-dark-0">Meals ({data?.data?.menu_list?.length})</h2>
                                <div className="grid gap-4 sm:gap-6 grid-cols-[repeat(auto-fill,minmax(265px,1fr))]">
                                {
                                    data?.data?.menu_list.map((cuisine, index) => (
                                        <CuisineCard key={index} cuisine={cuisine} />
                                    ))
                                }
                                </div>
                            </div>
                            {
                                ((cookRatings?.data || []).length > 0) && (
                                    <>
                                    <Separator />
                                    <div className="flex flex-col gap-8">
                                        <h2 className="font-semibold text-base text-grey-dark-0">Reviews & Ratings ({cookRatings?.data.length})</h2>
                                        {
                                            cookRatings?.data?.map((ratingData, index) => (
                                                <RatingsAndReview rating={ratingData} key={index} />
                                            ))
                                        }
                                    </div>
                                    </>
                                )
                            }
                        </div>
                        <div className="grid gap-6 content-start">
                            <StoreCard cookId={cookId} />
                            <StoreAvailability cookId={cookId} />
                        </div>
                    </div>
                </div>
            </Content>
        </section>
    )
}