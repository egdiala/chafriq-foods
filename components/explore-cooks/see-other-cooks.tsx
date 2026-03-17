import { Content } from "../content"
import { CookCard } from "./cook-card"

export const SeeOtherCooks = () => {
    return (
        <section id="see-other-cooks" className="relative isolate bg-orange-5 overflow-hidden">
            <Content>
                <div className="flex flex-col gap-12.5">
                    <h2 className="font-sora text-grey-dark-0 font-extrabold text-base md:text-xl lg:text-2xl xl:text-[2.5rem] leading-12">See Other Cooks</h2>
                    <div className="grid gap-8 grid-cols-[repeat(auto-fill,minmax(285px,1fr))]">
                    {
                        Array.from({ length: 4 }).map((_, index) => (
                            <CookCard key={index} />
                        ))
                    }
                    </div>
                </div>
            </Content>
        </section>
    )
}