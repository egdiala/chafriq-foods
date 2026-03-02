import { Content } from "../content"
import { Separator } from "../ui/separator"
import { IconCalendar, IconMapPinLine, IconSetup } from "../icons"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "../ui/input-group"
import { Search } from "lucide-react"

export const ExploreCuisinesStepsAway = () => {
    return (
        <section id="steps-away" className="relative isolate bg-white after:absolute after:bg-red-2 after:size-67.5 after:rounded-full after:bottom-0 after:top-1/2 after:right-0 after:translate-x-1/2 after:filter after:blur-[300px] overflow-hidden">
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
                    </div>
                </div>
            </Content>
        </section>
    )
}
