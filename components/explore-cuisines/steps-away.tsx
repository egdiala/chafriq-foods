"use client";

import { cn, dateToRender } from "@/lib/utils";
import { format } from "date-fns";
import { Content } from "../content";
import { Calendar } from "../ui/calendar";
import { useMemo, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "../ui/separator";
import { Check, Search } from "lucide-react";
import { CuisineCard } from "./cuisine-card";
import { useUser } from "@/context/use-user";
import { useDebounce } from "@uidotdev/usehooks";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useDishList, useGetMeals } from "@/services/queries/use-explore";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { IconArrowDown, IconBowlFood, IconCalendar, IconForkKnife, IconMapPinLine } from "../icons";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useQueryState } from "nuqs";

export const ExploreCuisinesStepsAway = () => {
    const { location } = useUser()
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 300);
    const [dishType, setDishType] = useQueryState('dish_type')
    const [pickupLocation] = useQueryState('pickup')
    const [pickupDate, setPickupDate] = useQueryState('pickup_date')

    const { data: dishList, isLoading: isLoadingDishList } = useDishList()
    const [filters, setFilters] = useState({
        dish_type_id: "",
        order_date: ""
    })

    const { data, isLoading } = useGetMeals({
        latitude: location?.latitude?.toString() || "",
        longitude: location?.longitude?.toString() || "",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        q: debouncedQuery,
        ...filters
    })

    const selectedDish = useMemo(() =>
        dishList?.data?.find((item) => item.dish_type_id === (filters.dish_type_id || dishType))?.name
    , [dishList?.data, dishType, filters.dish_type_id])

    const selectedDishId = useMemo(() =>
        dishList?.data?.find((item) => item.dish_type_id === (filters.dish_type_id || dishType))?.dish_type_id
    , [dishList?.data, dishType, filters.dish_type_id])

    return (
        <section id="steps-away" className="relative isolate bg-white after:hidden after:md:block after:-z-10 after:absolute after:bg-red-2 after:size-67.5 after:rounded-full after:bottom-0 after:top-1/2 after:right-0 after:translate-x-1/2 after:filter after:blur-[300px] overflow-hidden">
            <Content>
                <div className="flex flex-col gap-12.5">
                    <div className="grid gap-4 w-full md:max-w-240 mx-auto text-center">
                        <h2 className="font-sora text-grey-dark-0 font-extrabold text-[2.5rem] leading-12">Your Next Great Meal Is Just a Few Steps Away</h2>
                        <p className="text-grey-dark-2 font-normal text-base">Our chefs are ready. Place your order and relax — we’ll handle the rest.</p>
                    </div>
                    <div className="grid gap-5 w-full md:max-w-217.5 mx-auto">
                        <div className="flex items-center py-2 px-3 gap-4 bg-grey-dark-4 w-fit rounded-full mx-auto [&_svg]:size-3 [&_svg]:text-grey-dark-3">
                            {
                                pickupLocation && (
                                    <>
                                    <div className="flex items-center gap-1">
                                        <IconMapPinLine />
                                        <span className="text-xs text-grey-dark-2 flex-1 line-clamp-1 text-balance">{pickupLocation}</span>
                                    </div>
                                    <Separator orientation="vertical" />
                                    </>
                                )
                            }
                            <div className="flex items-center gap-1">
                                <IconCalendar />
                                <span className="text-xs text-grey-dark-2 flex-1 line-clamp-1 text-balance">
                                    {dateToRender(pickupDate as unknown as Date || new Date().toISOString() as unknown as Date)}
                                </span>
                            </div>
                        </div>
                        <InputGroup className="h-13 bg-white">
                            <InputGroupInput placeholder="Search a meal, cook" onChange={(e) => setQuery(e.target.value)} />
                            <InputGroupAddon>
                                <Search className="ml-1" />
                            </InputGroupAddon>
                        </InputGroup>
                        <div className="flex items-center justify-center flex-wrap gap-3 md:gap-7">
                            <DropdownMenu>
                                <DropdownMenuTrigger disabled={isLoadingDishList} asChild>
                                    <button type="button" data-selected={!!selectedDish} className="group inline-flex gap-1 items-center inset-ring-1 rounded-full px-3 h-9 bg-grey-dark-4 inset-ring-grey-dark-4 [&>svg]:text-orange-2 data-[selected=true]:bg-orange-5 data-[selected=true]:inset-ring-orange-2 data-[selected=true]:text-orange-2! transition-all duration-200 ease-out">
                                        <IconForkKnife />
                                        <span className="text-sm text-grey-dark-2 group-data-[selected=true]:text-orange-2">{selectedDish || "Dish type"}</span>
                                        <IconArrowDown className="text-grey-dark-3! group-data-[selected=true]:text-orange-2!" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                {
                                    dishList?.data.map((item) => (
                                        <DropdownMenuItem
                                            className="relative not-data-[variant=destructive]:focus:**:text-orange-2"
                                            key={item.dish_type_id} onClick={() => {
                                                setFilters((prev) => ({
                                                    ...prev,
                                                    dish_type_id: item.dish_type_id === prev.dish_type_id ? "" : item.dish_type_id
                                                }))
                                                setDishType(item.dish_type_id === selectedDishId ? null : item.dish_type_id)
                                            }}
                                        >
                                            {item.name}
                                            <Check className={cn("absolute right-2", item.dish_type_id === (filters.dish_type_id || dishType) ? "visible" : "invisible")} />
                                        </DropdownMenuItem>
                                    ))
                                }
                                </DropdownMenuContent>    
                            </DropdownMenu>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <button type="button" data-selected={!!(filters.order_date || pickupDate)} className="group inline-flex gap-1 items-center inset-ring-1 rounded-full px-3 h-9 bg-grey-dark-4 inset-ring-grey-dark-4 [&>svg]:text-orange-2 data-[selected=true]:bg-orange-5 data-[selected=true]:inset-ring-orange-2 data-[selected=true]:text-orange-2! transition-all duration-200 ease-out">
                                        <IconCalendar />
                                        <span className="text-sm text-grey-dark-2 group-data-[selected=true]:text-orange-2">{(filters.order_date || pickupDate) || "Order date"}</span>
                                        <IconArrowDown className="text-grey-dark-3! group-data-[selected=true]:text-orange-2!" />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent align="end" className="p-1 w-65">
                                    <Calendar
                                        mode="single"
                                        selected={(filters.order_date || pickupDate) as unknown as Date}
                                        onSelect={(pickedDate) => {
                                            setFilters((prev) => ({
                                                ...prev,
                                                order_date: pickedDate ? format(pickedDate as unknown as Date, "yyyy-MM-dd") : ""
                                            }))
                                            setPickupDate(pickedDate ? format(pickedDate as unknown as Date, "yyyy-MM-dd") : null)
                                        }}
                                        defaultMonth={new Date()}
                                        className="bg-transparent"
                                        captionLayout="label"
                                        disabled={{ before: new Date() }}
                                    />
                                </PopoverContent>    
                            </Popover>
                        </div>
                    </div>
                    {
                        isLoading ? (
                            <div className="grid gap-8 grid-cols-[repeat(auto-fill,minmax(285px,1fr))]">
                            {
                                Array.from({ length: 6 }).map((_, index) => (
                                    <div key={index}>
                                        <Skeleton className="h-60" />
                                    </div>
                                ))
                            }
                            </div>
                        ) : (!isLoading && data && (data?.data.length > 0)) ? (
                            <div className="grid gap-8 grid-cols-[repeat(auto-fill,minmax(285px,1fr))]">
                            {
                                data?.data?.map((cuisine) => (
                                    <CuisineCard key={cuisine.menu_id} cuisine={cuisine} />
                                ))
                            }
                            </div>
                        ) : (
                            <div className="flex flex-col items-center w-full max-w-md text-center mx-auto py-24">
                                <div className="bg-orange-5 rounded-full grid place-content-center size-9 inset-ring-1 inset-ring-orange-2/50 mb-4">
                                    <IconBowlFood className="size-4.5 text-orange-2" />
                                </div>
                                <span className="text-grey-dark-0 text-base font-semibold">No meals found</span>
                                <p className="text-grey-dark-2 text-sm font-normal">We couldn’t find any meals matching your search. Try adjusting your filters or searching with different keywords.</p>
                            </div>
                        )
                    }
                </div>
            </Content>
        </section>
    )
}
