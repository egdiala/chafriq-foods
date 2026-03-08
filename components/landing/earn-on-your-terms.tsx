import { cn } from "@/lib/utils"
import { Content } from "../content"
import { IconCalendar, IconChefHat, IconCookingPot, IconRssSimple, IconStorefront } from "../icons"
import { Button } from "../ui/button"
import Link from "next/link"

const terms = [
    {
        icon: <IconStorefront />,
        text: "No physical restaurant needed",
        background: "bg-orange-5 [&>span]:text-grey-dark-0",
        iconClass: "inset-ring-orange-4"
    },
    {
        icon: <IconCalendar />,
        text: "Flexible availability",
        background: "bg-red-5 [&>span]:text-grey-dark-0",
        iconClass: "inset-ring-red-4"
    },
    {
        icon: <IconCookingPot />,
        text: "Focus on cooking, we handle discovery & service pickup",
        background: "bg-yellow-5 [&>span]:text-yellow-1",
        iconClass: "inset-ring-yellow-2"
    },
    {
        icon: <IconRssSimple />,
        text: "Reach more customers in your area",
        background: "bg-orange-5 [&>span]:text-grey-dark-2",
        iconClass: "inset-ring-red-4"
    },
]

export const EarnOnYourTerms = ({ className }: { className?: string; }) => {
    return (
        <section id="earn-on-your-terms" className={cn("bg-white", className)}>
            <Content>
                <div className="flex flex-col gap-11">
                    <div className="grid gap-4 w-full md:max-w-151.5">
                        <h2 className="font-sora text-grey-dark-0 font-extrabold text-[2.5rem] leading-12">Cook What You Love. Earn on Your Terms.</h2>
                        <p className="text-grey-dark-2 font-normal text-base">Chafriq empowers passionate cooks to turn their skills into income. Set your menu, control your schedule, and get orders from people who love your food.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                        {
                            terms.map((term, index) => (
                                <div key={index} className={cn("flex items-center gap-4 px-5 py-3 rounded-4xl basis-1/4", term.background)}>
                                    <div className={cn("bg-white size-14 grid place-content-center inset-ring-1 [&>svg]:size-7 rounded-full text-orange-2", term.iconClass)}>
                                        {term.icon}
                                    </div>
                                    <span className="font-medium text-base flex-1">{term.text}</span>
                                </div>
                            ))
                        }
                    </div>
                    <Button className="[&>svg]:size-6! w-fit" asChild>
                        <Link href="/vendor/register">
                            <IconChefHat />
                            Become a Cook
                        </Link>
                    </Button>
                </div>
            </Content>
        </section>
    )
}