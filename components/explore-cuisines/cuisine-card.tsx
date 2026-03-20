import Link from "next/link"
import { IconBowlFood, IconPath, IconStorefront } from "../icons"
import { IconHourglass } from "../icons/icon-hourglass"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const items = [
    { icon: <IconBowlFood />, label: "1 plate" },
    { icon: <IconHourglass />, label: "1 hour" },
    { icon: <IconPath />, label: "25km away" },
    { icon: <IconStorefront />, label: "African kitchen" },
]

export const CuisineCard = () => {
    return (
        <Card className="group hover:ring-orange-2 hover:bg-orange-5 relative">
            <Link href="/meals/1" className="absolute inset-0 w-full h-full" />
            <CardContent>
                <Carousel opts={{ loop: true }} className="w-full">
                    <CarouselContent>
                        {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index}>
                            <div className="rounded-xl overflow-hidden aspect-video bg-orange-1">
                                <img src="https://images.unsplash.com/photo-1432139555190-58524dae6a55?q=80&w=2676&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="food" />
                            </div>
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="group-hover:start-4" />
                    <CarouselNext className="group-hover:end-4" />
                </Carousel>
            </CardContent>
            <div className="flex flex-col gap-3 px-3">
                <CardHeader className="px-0">
                    <CardTitle>Jollof & Fried Rice Combo</CardTitle>
                    <CardDescription>1 Jollof, 1 Fried, 2 Beef, 1 Plantain + pack</CardDescription>
                </CardHeader>
                <div className="flex items-center gap-3 flex-wrap">
                {
                    items.map((item, index) => (
                        <div key={index} className="flex items-center gap-1 text-xs text-grey-dark-2 [&>svg]:size-3.5 [&>svg]:text-orange-2">
                            {item.icon}
                            {item.label}
                        </div>
                    ))
                }
                </div>
                <span className="font-medium text-lg text-grey-dark-2">$34.34/Plate</span>
            </div>
        </Card>
    )
}