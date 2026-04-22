"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Content } from "../content";
import { Check, Search } from "lucide-react";
import { StoreCard } from "./store-card";
import { Separator } from "../ui/separator";
import { RatingsAndReview } from "./ratings-and-review";
import { StoreAvailability } from "./store-availability";
import { CuisineCard } from "../explore-cuisines/cuisine-card";
import { useDishList, useGetCook, useGetRatings } from "@/services/queries/use-explore";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "../ui/input-group";
import { IconArrowDown, IconForkKnife, IconGlobe, IconClockCountdown, IconEggCrack, IconSetup, IconCalendar } from "../icons"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { useDebounce } from "@uidotdev/usehooks";
import { Skeleton } from "../ui/skeleton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";

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
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 300);

    const [filters, setFilters] = useState({
        dish_type_id: "",
        order_date: ""
    })

    const { data: cookRatings, isLoading: isLoadingCookRatings } = useGetRatings({ cook_id: cookId })
    const { data, isLoading } = useGetCook({ cook_id: cookId, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, q: debouncedQuery, ...filters })

    const selectedDish = useMemo(() => data?.data?.dish_list?.find((item) => item.dist_type_id === filters.dish_type_id)?.name, [data?.data?.dish_list, filters.dish_type_id])

    return (
        <section id="cook-storefront" className="relative isolate bg-white after:hidden after:md:block after:-z-10 after:absolute after:bg-red-2 after:size-67.5 after:rounded-full after:bottom-0 after:top-0 after:-translate-y-1/2 after:right-0 after:translate-x-1/2 after:filter after:blur-[300px] overflow-hidden">
            <Content>
                <div className="flex flex-col gap-12.5">
                    <div className="grid gap-7 justify-items-center w-full md:max-w-151.5 mx-auto">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link href="/cooks">Cooks</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>   
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{data?.data?.business_name || ""}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <InputGroup className="h-13 bg-white">
                            <InputGroupInput placeholder="Search a meal" value={query} onChange={(e) => setQuery(e.target.value)} />
                            <InputGroupAddon>
                                <Search className="ml-1" />
                            </InputGroupAddon>
                        </InputGroup>
                        <div className="flex items-center justify-center flex-wrap gap-3 md:gap-7">
                            <DropdownMenu>
                                <DropdownMenuTrigger disabled={isLoading} asChild>
                                    <button type="button" data-selected={!!selectedDish} className="group inline-flex gap-1 items-center inset-ring-1 rounded-full px-3 h-9 bg-grey-dark-4 inset-ring-grey-dark-4 [&>svg]:text-orange-2 data-[selected=true]:bg-orange-5 data-[selected=true]:inset-ring-orange-2 data-[selected=true]:text-orange-2! transition-all duration-200 ease-out">
                                        <IconForkKnife />
                                        <span className="text-sm text-grey-dark-2 group-data-[selected=true]:text-orange-2">{selectedDish || "Dish type"}</span>
                                        <IconArrowDown className="text-grey-dark-3! group-data-[selected=true]:text-orange-2!" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                {
                                    data?.data?.dish_list?.map((item) => (
                                        <DropdownMenuItem
                                            className="relative not-data-[variant=destructive]:focus:**:text-orange-2"
                                            key={item.dist_type_id} onClick={() => setFilters((prev) => ({
                                                ...prev,
                                                dish_type_id: item.dist_type_id === prev.dish_type_id ? "" : item.dist_type_id
                                            }))}
                                        >
                                            {item.name}
                                            <Check className={cn("absolute right-2", item.dist_type_id === filters.dish_type_id ? "visible" : "invisible")} />
                                        </DropdownMenuItem>
                                    ))
                                }
                                </DropdownMenuContent>    
                            </DropdownMenu>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <button type="button" data-selected={!!filters?.order_date} className="group inline-flex gap-1 items-center inset-ring-1 rounded-full px-3 h-9 bg-grey-dark-4 inset-ring-grey-dark-4 [&>svg]:text-orange-2 data-[selected=true]:bg-orange-5 data-[selected=true]:inset-ring-orange-2 data-[selected=true]:text-orange-2! transition-all duration-200 ease-out">
                                        <IconCalendar />
                                        <span className="text-sm text-grey-dark-2 group-data-[selected=true]:text-orange-2">{filters?.order_date || "Order date"}</span>
                                        <IconArrowDown className="text-grey-dark-3! group-data-[selected=true]:text-orange-2!" />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent align="end" className="p-1 w-65">
                                    <Calendar
                                        mode="single"
                                        selected={(filters.order_date) as unknown as Date}
                                        onSelect={(pickedDate) => setFilters((prev) => ({
                                            ...prev,
                                            order_date: pickedDate ? format(pickedDate as unknown as Date, "yyyy-MM-dd") : ""
                                        }))}
                                        defaultMonth={new Date()}
                                        className="bg-transparent"
                                        captionLayout="label"
                                        disabled={{ before: new Date() }}
                                    />
                                </PopoverContent>    
                            </Popover>
                        </div>
                    </div>
                    <div className="grid sm:grid-cols-4 gap-6">
                        <div className="grid gap-12.5 sm:col-span-3">
                            <div className="flex flex-col gap-4">
                                <h2 className="font-semibold text-base text-grey-dark-0">Meals ({data?.data?.menu_list?.length || 0})</h2>
                                {
                                    (isLoading || !data) ? (
                                        <div className="grid gap-4 sm:gap-6 grid-cols-[repeat(auto-fill,minmax(265px,1fr))]">
                                            {
                                                Array.from({ length: 3 }).map((_, index) => (
                                                    <Skeleton key={index} className="h-76" />
                                                ))
                                            }
                                        </div>
                                    ) : (
                                        <div className="grid gap-4 sm:gap-6 grid-cols-[repeat(auto-fill,minmax(265px,1fr))]">
                                        {
                                            data?.data?.menu_list.map((cuisine, index) => (
                                                <CuisineCard key={index} cuisine={cuisine} />
                                            ))
                                        }
                                        </div>
                                    )
                                }
                            </div>
                            {
                                ((cookRatings?.data || []).length > 0) && (
                                    <>
                                    <Separator />
                                    <div className="flex flex-col gap-8">
                                        <h2 className="font-semibold text-base text-grey-dark-0">Reviews & Ratings ({cookRatings?.data.length || 0})</h2>
                                        {
                                            (isLoadingCookRatings || !cookRatings) ? (
                                                <>
                                                    {
                                                        Array.from({ length: 2 }).map((_, index) => (
                                                            <Skeleton key={index} className="h-21" />
                                                        ))
                                                    }
                                                </>
                                            ) : (
                                                <>
                                                {
                                                    cookRatings?.data?.map((ratingData, index) => (
                                                        <RatingsAndReview rating={ratingData} key={index} />
                                                    ))
                                                }
                                                </>
                                            )
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