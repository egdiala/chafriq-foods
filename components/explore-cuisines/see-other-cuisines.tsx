"use client";

import { useGetMeals } from "@/services/queries/use-explore";
import { Content } from "../content"
import { CuisineCard } from "./cuisine-card"

export const SeeOtherCuisines = () => {
    const { data } = useGetMeals({})
    return (
        <section id="see-other-cooks" className="relative isolate bg-orange-5 overflow-hidden">
            <Content>
                <div className="flex flex-col gap-12.5">
                    <h2 className="font-sora text-grey-dark-0 font-extrabold text-base md:text-xl lg:text-2xl xl:text-[2.5rem] leading-12">See Other Meals</h2>
                    <div className="grid gap-8 grid-cols-[repeat(auto-fill,minmax(285px,1fr))]">
                    {
                        data?.data?.slice(0, 4).map((cuisine, index) => (
                            <CuisineCard key={index} cuisine={cuisine} />
                        ))
                    }
                    </div>
                </div>
            </Content>
        </section>
    )
}