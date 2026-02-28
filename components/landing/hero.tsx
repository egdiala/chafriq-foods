import { Search } from "lucide-react"
import { Content } from "../content"
import { Button } from "../ui/button"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "../ui/input-group"
import { IconCalendar, IconCookingPot } from "../icons"

export const Hero = () => {
    return (
        <section id="hero" className="relative overflow-hidden h-svh">
            <div className="pointer-events-none after:absolute after:inset-0 after:bg-red-1/62 absolute inset-0 -z-10 flex h-full w-full items-center justify-center">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="h-full w-full object-cover"
                >
                    <source src="/chafriq-hero-video.mp4" type="video/mp4" />
                </video>
            </div>
            <Content className="flex flex-col items-center justify-center min-h-full">
                <div className="text-center space-y-5 w-full max-w-151.5">
                    <h1 className="font-sora text-white font-extrabold text-5xl">Scheduled cooking. Ready for pickup.</h1>
                    <p className="text-white font-normal text-base">Pre-order meals and collect them fresh at your chosen time.</p>
                    <div className="space-y-4">
                        <InputGroup className="h-13 bg-orange-5">
                            <InputGroupInput placeholder="Enter your pickup suburb/postcode" />
                            <InputGroupAddon>
                                <Search />
                            </InputGroupAddon>
                            <InputGroupAddon align="inline-end">
                                <div className="flex items-center border-l border-l-outline pl-2">
                                    <InputGroupButton variant="ghost" className="[&>svg]:size-5!">
                                        <IconCalendar />
                                        Pickup date & time
                                    </InputGroupButton>
                                </div>   
                            </InputGroupAddon>
                        </InputGroup>
                        <p className="text-orange-3 font-normal text-sm">Address not found, please adjust your search parameter</p>
                        <Button className="[&>svg]:size-6!">
                            <IconCookingPot />
                            Find Meals
                        </Button>
                    </div>
                </div>
            </Content>
        </section>
    )
}