import Link from "next/link"
import { IconBowlFood, IconPath, IconStorefront } from "../icons"
import { IconHourglass } from "../icons/icon-hourglass"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useUser } from "@/context/use-user"
import { useMemo } from "react"
import { formatHours } from "@/lib/utils"

type Props = {
    cuisine: GetMenuResponse
    onView?: () => void;
}

export const CuisineCard = ({ cuisine, onView }: Props) => {
    const { type } = useUser()

    const items = useMemo(() => {
        const dishList = cuisine.dish_list.map((dish) => ({ icon: <IconStorefront />, label: dish.name }))
        return [
            { icon: <IconBowlFood />, label: `${cuisine.quantity_size} ${cuisine.quantity_unit}${cuisine.quantity_size > 1 ? "s" : ""}` },
            { icon: <IconHourglass />, label: formatHours(cuisine.cooking_hour) },
            (type === "customer" ? { icon: <IconPath />, label: "25km away" } : {}),
            ...dishList
        ]
    }, [cuisine.cooking_hour, cuisine.dish_list, cuisine.quantity_size, cuisine.quantity_unit, type])
    
    return (
        <Card onClick={() => onView?.()} className="group hover:ring-orange-2 hover:bg-orange-5 relative hover:cursor-pointer">
            { type === "customer" && (<Link href={`/meals/${cuisine.menu_id}`} className="absolute inset-0 w-full h-full" />)}
            <CardContent onClick={(e) => e.stopPropagation()}>
                <Carousel opts={{ loop: true }} className="w-full">
                    <CarouselContent>
                        {(cuisine?.image_data || []).map((media, index) => (
                        <CarouselItem key={index}>
                            <div className="rounded-xl overflow-hidden aspect-video bg-orange-1">
                                {
                                    media.mime_type.startsWith("image") ? (
                                        <img src={media?.file_url} alt={media.image_id} className="object-cover object-center w-full" />
                                    ): (
                                        <video
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            preload="auto"
                                            className="h-full w-full object-cover"
                                        >
                                            <source src={media?.file_url} type={media.mime_type} />
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
            </CardContent>
            <div className="flex flex-col gap-3 px-3">
                <CardHeader className="px-0">
                    <CardTitle>{cuisine.menu_name}</CardTitle>
                    <CardDescription className="line-clamp-4">{cuisine.menu_content}</CardDescription>
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
                <span className="font-medium text-lg text-grey-dark-2">
                    {Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 2 }).format(cuisine.menu_amount)}/{cuisine.quantity_unit.toLowerCase()}
                </span>
            </div>
        </Card>
    )
}