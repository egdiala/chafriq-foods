import { cn } from "@/lib/utils";
import { IconCookingPot, IconShoppingCart } from "@/components/icons";

type Props = {
    className?: string;
}

export const TopCards = ({ className }: Props) => {
    const cards = [
        {
            icon: <IconShoppingCart />,
            title: "Total Orders",
            value: "2,853"
        },
        {
            icon: <IconCookingPot />,
            title: "Pending",
            value: "2,853"
        },
        {
            icon: <IconCookingPot />,
            title: "Completed",
            value: "2,853"
        },
        {
            icon: <IconCookingPot />,
            title: "Cancelled",
            value: "2,853"
        },
        {
            icon: <IconCookingPot />,
            title: "Ongoing",
            value: "2,853"
        }
    ]
    return (
        <div className={cn("grid gap-4", className)} style={{ gridTemplateColumns: "repeat(auto-fill, minmax(164px, 1fr))" }}>
            {
                cards.map((card, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 inset-ring-1 inset-ring-outline rounded-xl">
                        <div className="grid place-content-center-safe size-8 bg-orange-5 text-orange-2 [&>svg]:size-4 rounded-xl">{card.icon}</div>
                        <div className="grid gap-px">
                            <span className="text-xs text-grey-dark-2">{card.title}</span>
                            <p className="font-semibold text-sm text-grey-dark-2">{card.value}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}