import { IconCheckmark, IconMapPinLine, IconStarFull } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";


type Props = {
    className?: string;
}

export const StoreCard = ({ className }: Props) => {
    return (
        <div className={cn("rounded-2xl bg-white border border-outline overflow-hidden", className)}>
            <div className="hidden sm:block relative bg-orange-5 h-46">
                <Image src="/food-doodles.svg" alt="food-doodles" className="object-cover object-center" fill />
            </div>
            <div className="grid gap-3 px-3 sm:px-5 py-3 sm:py-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex sm:flex-col items-start gap-2.5">
                        <Avatar className="size-14 sm:size-24.5 sm:outline-2 sm:outline-white rounded-2xl sm:rounded-lg sm:-mt-18">
                            <AvatarImage src="/quality-1.webp" className="rounded-2xl sm:rounded-lg" />
                            <AvatarFallback>SD</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <h1 className="text-sm sm:text-2xl font-semibold sm:font-extrabold text-grey-dark-0">Jollof Rice Kitchen</h1>
                            <div className="flex items-center gap-1 bg-success-light text-xs text-success h-5 px-2 w-fit rounded-full">
                                <IconCheckmark />
                                <span className="line-clamp-1">ID Verified</span>
                            </div>
                            <div className="sm:hidden flex items-center gap-2 text-sm text-grey-dark-2 [&>svg]:text-yellow-2"><IconStarFull /> 4.5</div>
                        </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 text-sm text-grey-dark-2 [&>svg]:text-yellow-2"><IconStarFull /> 4.5</div>
                </div>
                <div className="flex items-center gap-3.5 flex-wrap">
                {
                    Array.from({ length: 3 }).map((_, index) => (
                        <span key={index} className="h-4.5 flex items-center justify-center px-1 text-amber text-xs bg-amber-light rounded">Cuisine Type {index + 1}</span>
                    ))
                }
                </div>
                <div className="flex items-center gap-1 text-xs text-grey-dark-2 [&>svg]:size-3.5 [&>svg]:text-orange-2">
                    <IconMapPinLine />
                    4517 Washington Ave. Manchester, Kentucky 39495
                </div>
            </div>
        </div>
    )
}