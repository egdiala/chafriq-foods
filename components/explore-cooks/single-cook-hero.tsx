"use client";

import { Content } from "../content"
import { useGetCook } from "@/services/queries/use-explore"
import { Spinner } from "../ui/spinner";

type Props = {
    cookId: string;
}

export const SingleCookHero = ({ cookId }: Props) => {
    const { data, isLoading } = useGetCook({
        cook_id: cookId,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    })
    
    return (
        <section id="hero" className="relative overflow-hidden h-[50svh]">
            {
                isLoading ? (
                    <div className="flex flex-col justify-center h-full">
                        <Spinner className="size-5 mx-auto" />
                    </div>
                ) : (
                    <>
                        <div className="pointer-events-none after:absolute after:inset-0 after:bg-red-1/62 absolute inset-0 -z-10 flex h-full w-full items-center justify-center">
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="auto"
                                className="h-full w-full object-cover"
                            >
                                <source src="/chafriq-hero-video.webm" type="video/mp4" />
                            </video>
                        </div>
                        <Content className="flex flex-col items-center justify-center min-h-full">
                            <div className="text-center space-y-5 w-full max-w-151.5">
                                <h1 className="font-sora text-white font-extrabold text-3xl md:text-5xl">{data?.data?.business_name}</h1>
                                <div className="flex items-center justify-center gap-3.5 flex-wrap">
                                {
                                    data?.data?.dish_list.map((dish, index) => (
                                        <span key={index} className="h-4.5 flex items-center justify-center px-1 text-amber text-xs bg-amber-light rounded">{dish?.name}</span>
                                    ))
                                }
                                </div>
                            </div>
                        </Content>
                    </>
                )
            }
        </section>
    )
}