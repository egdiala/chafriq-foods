"use client";

import { useState } from "react"
import { Content } from "../content"
import { Search } from "lucide-react"
import { Separator } from "../ui/separator"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "../ui/input-group"
import { IconArrowDown, IconCalendar, IconClockCountdown, IconEggCrack, IconForkKnife, IconGlobe, IconMapPinLine, IconPath, IconSetup } from "../icons"
import { CookCard } from "./cook-card";

const filters = [
    { icon: <IconForkKnife />, label: "All Meals" },
    { icon: <IconGlobe />, label: "African" },
    { icon: <IconClockCountdown />, label: "1 hour" },
    { icon: <IconPath />, label: "34km away" },
    { icon: <IconEggCrack />, label: "Vegan" }
]

export const ExploreCooksStepsAway = () => {
    const [active, setActive] = useState(0)
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
                            <div className="flex items-center gap-1">
                                <IconMapPinLine />
                                <span className="text-xs text-grey-dark-2">6391 Elgin St. Celina, Delaware 10299</span>
                            </div>
                            <Separator orientation="vertical" />
                            <div className="flex items-center gap-1">
                                <IconCalendar />
                                <span className="text-xs text-grey-dark-2">2nd May, 2023</span>
                            </div>
                        </div>
                        <InputGroup className="h-13 bg-white">
                            <InputGroupInput placeholder="Search a meal, cook, cuisine " />
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
                    <div className="grid gap-8 grid-cols-[repeat(auto-fill,minmax(285px,1fr))]">
                    {
                        Array.from({ length: 10 }).map((_, index) => (
                            <CookCard key={index} />
                        ))
                    }
                    </div>
                </div>
            </Content>
        </section>
    )
}
