"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Content } from "../content";
import { Button } from "../ui/button";
import { useMemo, useState } from "react";
import { Calendar } from "../ui/calendar";
import { useUser } from "@/context/use-user";
import { Check, Search } from "lucide-react";
import { useDebounce } from "@uidotdev/usehooks";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useDishList, useGetMeals } from "@/services/queries/use-explore";
import { IconArrowDown, IconCalendar, IconCookingPot, IconForkKnife, IconSetup } from "../icons";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "../ui/input-group";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

export const Hero = () => {
    const { type, location } = useUser()
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 300);

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

    const selectedDish = useMemo(() => dishList?.data?.find((item) => item.dish_type_id === filters.dish_type_id)?.name, [dishList?.data, filters.dish_type_id])
    return (
        <section id="hero" className={cn("relative overflow-hidden", type === "customer" ? "h-[50svh]" : "h-svh")}>
            <div className="pointer-events-none after:absolute after:inset-0 after:bg-red-1/62 absolute inset-0 -z-10 flex h-full w-full items-center justify-center">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="h-full w-full object-cover"
                >
                    <source src="/chafriq-hero-video.webm" type="video/webm" />
                </video>
            </div>
            <Content className="flex flex-col items-center justify-center min-h-full">
                <div className="text-center space-y-5 w-full max-w-151.5">
                    <h1 className="font-sora text-white font-extrabold text-3xl md:text-5xl">
                    {
                        type === "customer" ? "Hungry? Order & Eat" : "Scheduled cooking. Ready for pickup."
                    }
                    </h1>
                    {
                        (type != "customer") && (<p className="text-white font-normal text-base">Pre-order meals and collect them fresh at your chosen time.</p>)
                    }
                    
                    <div className="space-y-4">
                        <InputGroup className="h-13 bg-orange-5">
                            <InputGroupInput placeholder="Enter your pickup suburb/postcode" onChange={(e) => setQuery(e.target.value)} />
                            <InputGroupAddon>
                                <Search />
                            </InputGroupAddon>
                            <InputGroupAddon align="inline-end">
                            {
                                type === "customer" ? (
                                    <InputGroupButton variant="default" size="icon-sm">
                                        <IconSetup />
                                    </InputGroupButton>    
                                ) : (
                                    <div className="flex items-center border-l border-l-outline pl-2">
                                        <InputGroupButton variant="ghost" className="[&>svg]:size-5!">
                                            <IconCalendar />
                                            Pickup date & time
                                        </InputGroupButton>
                                    </div> 
                                )
                            }
                            </InputGroupAddon>
                        </InputGroup>
                        {/* <p className="text-orange-3 font-normal text-sm">Address not found, please adjust your search parameter</p> */}
                        {
                            type != "customer" ? (
                                <Button className="[&>svg]:size-6!" asChild>
                                    <Link href="/meals">
                                        <IconCookingPot />
                                        Find Meals
                                    </Link>
                                </Button>
                            ) : (
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
                                                    key={item.dish_type_id} onClick={() => setFilters((prev) => ({
                                                        ...prev,
                                                        dish_type_id: item.dish_type_id === prev.dish_type_id ? "" : item.dish_type_id
                                                    }))}
                                                >
                                                    {item.name}
                                                    <Check className={cn("absolute right-2", item.dish_type_id === filters.dish_type_id ? "visible" : "invisible")} />
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
                                                selected={filters.order_date as unknown as Date}
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
                            )
                        }
                    </div>
                </div>
            </Content>
        </section>
    )
}