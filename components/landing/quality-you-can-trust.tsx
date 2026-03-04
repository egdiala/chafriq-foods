import Image from "next/image"
import { Content } from "../content"
import { Button } from "../ui/button"
import { IconCookingPot } from "../icons"
import { cn } from "@/lib/utils"

const qualities = [
    {
        title: "Selective by Design",
        description: "We feature a tightly curated group of top local cooks.",
        image: "/quality-1.webp"
    },
    {
        title: "Flavour-Approved",
        description: "Dishes are evaluated for taste, quality, and presentation.",
        image: "/quality-3.webp"
    },
    {
        title: "Excellence in Every Order",
        description: "From preparation to pickup, quality always comes first.",
        image: "/quality-2.webp"
    },
    {
        title: "Certified Kitchens, Trusted Chefs",
        description: "Every partner meets hygiene and safety standards.",
        image: "/quality-4.webp"
    },
]

export const QualityYouCanTrust = () => {
    return (
        <section id="quality-you-can-trust" className="relative isolate bg-yellow-5 after:hidden after:md:block after:absolute after:bg-red-2 after:size-67.5 after:rounded-full after:bottom-0 after:translate-y-1/2 after:left-0 after:-translate-x-1/2 after:filter after:blur-[314px] overflow-hidden">
            <Content>
                <div className="flex flex-col items-center gap-12.5">
                    <div className="mx-auto w-full md:max-w-124">
                        <h2 className="text-center font-sora text-grey-dark-0 font-extrabold text-[2.5rem] leading-12">Quality You Can Trust, Every Single Time</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-6 w-full max-w-190 h-fit">
                        {
                            qualities.map((quality, index) => (
                                <div key={index} className="flex flex-col gap-5 group">
                                    <div className={cn("md:group-even:order-2 grid relative rounded-4xl overflow-hidden", index > 1 ? "h-58" : "h-58 md:h-79.5")}>
                                        <Image src={quality.image} alt={quality.image.replace(".webp", "").replace("/", "")} className="object-cover object-center" fill />
                                    </div>
                                    <div className="md:group-even:order-1 grid gap-1 rounded-4xl p-5 bg-white shadow-(--shadow-elevated)">
                                        <h3 className="font-semibold text-base text-orange-2">{quality.title}</h3>
                                        <p className="font-normal text-sm text-grey-dark-2">{quality.description}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <Button className="[&>svg]:size-6!">
                        <IconCookingPot />
                        Order Food
                    </Button>
                </div>
            </Content>
        </section>
    )
}