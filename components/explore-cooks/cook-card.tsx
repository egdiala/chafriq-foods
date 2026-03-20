import Image from "next/image"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { IconFavorite, IconForkKnife, IconMapPinLine } from "../icons"
import Link from "next/link"

const items = [
    { icon: <IconMapPinLine />, label: "25km away" },
    { icon: <IconForkKnife />, label: "4 Meals" },
]

export const CookCard = () => {
    return (
        <Card className="group hover:ring-orange-2 hover:bg-orange-5 relative">
            <Link href="/cooks/1" className="absolute inset-0 w-full h-full" />
            <CardContent className="isolate">
                <div className="relative rounded-xl overflow-hidden aspect-video">
                    <Button variant="carousel" size="icon-xs" className="absolute top-2 right-2 z-10">
                        <IconFavorite />
                    </Button>
                    <Image src="/quality-1.webp" alt="chef" className="object-cover" fill />
                </div>
            </CardContent>
            <div className="flex flex-col gap-3 px-3">
                <CardHeader className="px-0">
                    <CardTitle>African Kitchen</CardTitle>
                    <div className="h-4.5 flex items-center justify-center gap-1 px-2 text-success text-xs bg-success/5 rounded-full w-fit">
                        <span className="size-1.5 rounded-full bg-success" />
                        Available Now
                    </div>
                </CardHeader>
                <div className="flex items-center gap-3.5 flex-wrap">
                {
                    Array.from({ length: 3 }).map((_, index) => (
                        <span key={index} className="h-4.5 flex items-center justify-center px-1 text-amber text-xs bg-amber-light rounded">Cuisine Type {index + 1}</span>
                    ))
                }
                </div>
                <div className="flex flex-col gap-2.5">
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
                        <span className="font-medium text-lg text-grey-dark-2">$34</span>
                    </div>
                </div>
            </div>
        </Card>
    )
}