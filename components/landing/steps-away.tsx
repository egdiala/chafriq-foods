import Image from "next/image"
import { Content } from "../content"

export const StepsAway = () => {
    return (
        <section id="steps-away" className="relative isolate bg-orange-5 after:absolute after:bg-red-2 after:size-67.5 after:rounded-full after:bottom-0 after:top-1/2 after:right-0 after:translate-x-1/2 after:filter after:blur-[300px] overflow-hidden">
            <Content>
                <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-20">
                    <div className="order-2 md:order-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-153">
                        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                            <div className="grid relative h-40 md:h-51.5 rounded-xl md:rounded-4xl overflow-hidden">
                                <Image src="/woman-frying.png" alt="woman-frying" className="object-cover object-center" fill />
                            </div>
                            <div className="grid relative h-40 md:h-51.5 rounded-xl md:rounded-4xl overflow-hidden">
                                <Image src="/woman-cutting-tomatoes.png" alt="woman-cutting-tomatoes" className="object-cover object-center" fill />
                            </div>
                        </div>
                        <div className="grid relative h-50 md:h-107 rounded-xl md:rounded-4xl overflow-hidden">
                            <Image src="/man-preparing-sushi.png" alt="man-preparing-sushi" className="object-cover object-[50%_45%] md:object-center" fill />
                        </div>
                    </div>
                    <div className="order-1 md:order-2 grid gap-4 w-full md:max-w-108">
                        <h2 className="font-sora text-grey-dark-0 font-extrabold text-[2.5rem] leading-12">Your Next Great Meal Is Just a Few Steps Away</h2>
                        <p className="text-grey-dark-2 font-normal text-base">Our chefs are ready. Place your order and relax — we’ll handle the rest.</p>
                    </div>
                </div>
            </Content>
        </section>
    )
}
