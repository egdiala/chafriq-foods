"use client";

import { Content } from "../content";
import { CookCard } from "../explore-cooks/cook-card";
import { useGetCooks } from "@/services/queries/use-explore";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Spinner } from "../ui/spinner";

export const BestSellers = () => {
    const { data, isLoading } = useGetCooks({})
    return (
        <section id="see-other-cooks" className="relative isolate bg-white overflow-hidden">
            <Content className="space-y-15">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 lg:col-span-8">
                    <div className="rounded-xl bg-grey-dark-4 font-bold text-4xl text-outline text-center grid place-content-center-safe h-25">Ads</div>
                    <div className="rounded-xl bg-grey-dark-4 font-bold text-4xl text-outline text-center grid place-content-center-safe h-25">Ads</div>
                </div>
                <div className="flex flex-col gap-7">
                    <div className="grid gap-2">
                        <h2 className="font-sora text-grey-dark-0 font-extrabold text-base md:text-xl lg:text-2xl xl:text-[2.5rem] leading-12">Best sellers</h2>
                        <p className="text-bas text-grey-dark-2">Our chefs are ready. Place your order and relax — we’ll handle the rest.</p>
                    </div>
                    {
                        isLoading ? (
                            <div className="flex flex-col justify-center h-69">
                                <Spinner className="size-5 mx-auto" />
                            </div>
                        ) : (
                            <div className="grid gap-8 grid-cols-[repeat(auto-fill,minmax(285px,1fr))]">
                            {
                                data?.data?.slice(0, 4)?.map((cook, index) => (
                                    <CookCard key={index} cook={cook} />
                                ))
                            }
                            </div>
                        )
                    }
                    <div className="mx-auto mt-2">
                        <Button asChild>
                            <Link href="/cooks">See More <ArrowRight /></Link>
                        </Button>
                    </div>
                </div>
            </Content>
        </section>
    )
}