import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { IconForkKnife, IconMapPinLine } from "../icons"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useMemo } from "react"

type Props = {
    cook: GetCooksResponse
}

export const CookCard = ({ cook }: Props) => {

    const items = useMemo(() => {
        return [
            { icon: <IconMapPinLine />, label: `${Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(cook?.distance || 0)}km away` },
            { icon: <IconForkKnife />, label: `${cook.total_menu} Meal${cook.total_menu === 1 ? "" : "s"}` },
        ]
    },[cook?.distance, cook.total_menu])

    return (
        <Card className="group hover:ring-orange-2 hover:bg-orange-5 relative">
            <Link href={`/cooks/${cook.cook_id}`} className="absolute inset-0 w-full h-full" />
            <CardContent className="isolate">
                <div className="relative rounded-xl overflow-hidden aspect-video bg-orange-1">
                    {/* <Button variant="carousel" size="icon-xs" className="absolute top-2 right-2 z-10">
                        <IconFavorite />
                    </Button> */}
                    {cook.business_logo && (<img src={cook.business_logo} alt={cook.business_name} className="object-cover h-full w-full" />)}
                </div>
            </CardContent>
            <div className="flex flex-col gap-3 px-3 flex-1">
                <CardHeader className="px-0">
                    <CardTitle>{cook.business_name}</CardTitle>
                    <div className={cn("h-4.5 flex items-center justify-center gap-1 px-2 text-xs rounded-full w-fit", cook.is_available ? "text-success bg-success/5" : "text-red-2 bg-red-2/5")}>
                        <span className={cn("size-1.5 rounded-full", cook.is_available ? "bg-success" : "bg-red-2")} />
                        {cook.is_available ? "Available Now" : "Not Available"}
                    </div>
                </CardHeader>
                <div className="flex items-center gap-3.5 flex-wrap">
                {
                    (cook.dish_list || []).map((dish, index) => (
                        <span key={index} className="h-4.5 flex items-center justify-center px-1 text-amber text-xs bg-amber-light rounded">{dish.name}</span>
                    ))
                }
                </div>
                <div className="flex flex-col gap-2.5 justify-between flex-1">
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
                    <div className="flex items-center gap-0.5">
                        <span className="font-normal text-xs text-grey-dark-3">From</span>
                        <span className="font-medium text-lg text-grey-dark-2">
                            {Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 2 }).format(cook.from_amount)}
                        </span>
                    </div>
                </div>
            </div>
        </Card>
    )
}