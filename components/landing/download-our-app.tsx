import Image from "next/image"
import { Content } from "../content"

export const DownloadOurApp = () => {
    return (
        <section id="download-our-app" className="relative isolate bg-red-1 [clip-path:ellipse(150%_100%_at_50%_0%)] lg:[clip-path:ellipse(120%_100%_at_50%_0%)]">
            <TopWave className="absolute top-0 -translate-y-10 md:-translate-y-15 inset-x-0 w-full h-auto" />
            <Content className="isolate">
                <div className="grid grid-cols-1 md:grid-cols-2 pb-27">
                    <div className="grid gap-4 w-full md:max-w-108 md:place-self-center">
                        <h2 className="font-sora text-white font-extrabold text-[3.5rem] leading-15">Good Food, Whenever You Want It</h2>
                        <p className="text-white font-normal text-base">Order faster, save favorites, track deliveries, and discover new cooks — all from your phone</p>
                    </div>
                    <div className="md:absolute -z-10 ml-auto md:inset-x-0 md:right-0 md:[&>img]:translate-x-0 md:bottom-0 md:h-full hidden md:flex w-[50vw]">
                        <Image
                            src="/order-food-mobile-app.webp"
                            alt="order-food-mobile"
                            fill
                            className="object-contain object-center"
                        />
                    </div>
                    <div className="md:hidden h-67 w-full translate-y-37">
                        <Image
                            src="/order-food-mobile-app.webp"
                            alt="order-food-mobile"
                            fill
                            className="object-cover object-center"
                        />
                    </div>
                </div>
            </Content>
        </section>
    )
}

const TopWave = (props: React.HTMLAttributes<SVGElement>) => (
    <svg viewBox="0 0 1440 238" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M0 32.213C566.534 81.9326 844.781 -60.6677 1440 32.213V238H0V32.213Z" fill="#660000"/>
    </svg>
)

const BottomWave = (props: React.HTMLAttributes<SVGElement>) => (
    <svg viewBox="0 0 1440 238" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M1440 225.714C873.466 206.75 595.219 261.139 0 225.714V4L1440 -1.52588e-05V225.714Z" fill="#660000"/>
    </svg>
)