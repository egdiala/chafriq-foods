import { Content } from "../content"

export const ExploreCooksHero = () => {
    return (
        <section id="hero" className="relative overflow-hidden h-[50svh]">
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
                    <h1 className="font-sora text-white font-extrabold text-3xl md:text-5xl">Explore Cooks</h1>
                    <p className="text-white font-normal text-base">Discover authentic African dishes; from local street food to comforting home-style meals and chef-crafted plates, cooked fresh and delivered to you.</p>
                </div>
            </Content>
        </section>
    )
}