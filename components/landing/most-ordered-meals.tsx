"use client";

import { Content } from "../content";
import { useGetMeals } from "@/services/queries/use-explore";
import { CuisineCard } from "../explore-cuisines/cuisine-card";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { Spinner } from "../ui/spinner";

export const MostOrderedMeals = () => {
    const { data, isLoading } = useGetMeals({ req_type: "2" })
    return (
        <section id="see-other-cooks" className="relative isolate bg-white overflow-hidden">
            <Content>
                <div className="flex flex-col gap-7">
                    <div className="grid gap-2">
                        <h2 className="font-sora text-grey-dark-0 font-extrabold text-base md:text-xl lg:text-2xl xl:text-[2.5rem] leading-12">Most Ordered Meals</h2>
                        <p className="text-bas text-grey-dark-2">Cuisine categories ranked by order volume</p>
                    </div>
                    {
                        isLoading ? (
                            <div className="flex flex-col justify-center h-69">
                                <Spinner className="size-5 mx-auto" />
                            </div>
                        ) : (
                            <div className="grid gap-8 grid-cols-[repeat(auto-fill,minmax(285px,1fr))]">
                            {
                                data?.data?.slice(0, 4).map((cuisine, index) => (
                                    <CuisineCard key={index} cuisine={cuisine} />
                                ))
                            }
                            </div>
                        )
                    }
                    <div className="mx-auto mt-2">
                        <Button asChild>
                            <Link href="/meals">See More <ArrowRight /></Link>
                        </Button>
                    </div>
                </div>
            </Content>
        </section>
    )
}