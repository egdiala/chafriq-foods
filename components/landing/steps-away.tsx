import { Content } from "../content"

export const StepsAway = () => {
    return (
        <section id="steps-away" className="relative isolate bg-orange-5 after:absolute after:bg-red-2 after:size-67.5 after:rounded-full after:bottom-0 after:top-1/2 after:right-0 after:translate-x-1/2 after:filter after:blur-[300px] overflow-hidden">
            <Content>
                <div className="flex items-center gap-20">
                    <div className="flex-1"></div>
                    <div className="grid gap-4 w-full max-w-108">
                        <h2 className="font-sora text-grey-dark-0 font-extrabold text-[2.5rem] leading-12">Your Next Great Meal Is Just a Few Steps Away</h2>
                        <p className="text-grey-dark-2 font-normal text-base">Our chefs are ready. Place your order and relax — we’ll handle the rest.</p>
                    </div>
                </div>
            </Content>
        </section>
    )
}
