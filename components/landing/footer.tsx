import Link from "next/link"
import { Content } from "../content"
import { IconFacebook, IconInstagram, IconTwitter, LogoWithText } from "../icons"
import { cn } from "@/lib/utils"

const footerLinks = {
    "actions": [
        { link: "#", text: "Become a Cook" },
        { link: "/explore-cooks", text: "Explore Cooks" }
    ],
    "support": [
        { link: "/contact-us", text: "Help Center" },
        { link: "#", text: "FAQs" }
    ],
    "legal": [
        { link: "/terms-and-conditions", text: "Terms of Use" },
        { link: "/privacy-policy", text: "Privacy Policy" },
    ]
}

const socialLinks = [
    {
        icon: <IconInstagram />,
        link: "#"
    },
    {
        icon: <IconTwitter />,
        link: "#"
    },
    {
        icon: <IconFacebook />,
        link: "#"
    },
]

export const Footer = () => {
    return (
        <footer className="bg-grey-dark-0">
            <Content>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 place-items-center md:place-items-start text-center md:text-left gap-12.5">
                    <div className="flex flex-col gap-4">
                        <LogoWithText />
                        <p className="text-orange-3 text-xs">(C) {new Date().getFullYear()} CHAFIRQ</p>
                    </div>
                    {
                        Object.keys(footerLinks).map((item) => (
                            <div key={item} className="flex flex-col gap-4">
                                <span className="uppercase font-medium text-xs text-orange-4">{item}</span>
                                <div className="flex flex-col gap-6 items-center md:items-start">
                                {
                                    footerLinks[item as keyof typeof footerLinks].map((footerLink, index) => (
                                        <Link
                                            key={index}
                                            href={footerLink.link}
                                            className={cn(
                                                "relative text-sm font-normal leading-6 w-fit text-white",
                                                "after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full",
                                                "after:scale-x-0 after:will-change-transform after:bg-orange-2",
                                                "after:transition-transform after:duration-300 after:ease-in-out",
                                                "hover:after:scale-x-100 hover:after:origin-center",
                                                "transition-all duration-500 ease-out",
                                            )}
                                        >
                                            {footerLink.text}
                                        </Link>
                                    ))
                                }
                                </div>
                            </div>
                        ))
                    }
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-0.5 items-center md:items-start">
                            <span className="uppercase font-medium text-xs text-orange-4">Phone</span>
                            <Link
                                href="tel:+2347053204002"
                                className={cn(
                                    "relative text-sm font-normal leading-6 w-fit text-white",
                                    "after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full",
                                    "after:scale-x-0 after:will-change-transform after:bg-orange-2",
                                    "after:transition-transform after:duration-300 after:ease-in-out",
                                    "hover:after:scale-x-100 hover:after:origin-center",
                                    "transition-all duration-500 ease-out",
                                )}
                            >
                                1234, 3456, 7890
                            </Link>
                        </div>
                        <div className="flex flex-col gap-0.5 items-center md:items-start">
                            <span className="uppercase font-medium text-xs text-orange-4">Email</span>
                            <Link
                                href="mailto:support@email.com"
                                className={cn(
                                    "relative text-sm font-normal leading-6 w-fit text-white",
                                    "after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full",
                                    "after:scale-x-0 after:will-change-transform after:bg-orange-2",
                                    "after:transition-transform after:duration-300 after:ease-in-out",
                                    "hover:after:scale-x-100 hover:after:origin-center",
                                    "transition-all duration-500 ease-out",
                                )}
                            >
                                support@email.com
                            </Link>
                        </div>
                        <div className="flex items-center gap-5">
                            {
                                socialLinks.map((item, index) => (
                                    <Link key={index} href={item.link} className="size-8 grid place-content-center rounded-lg hover:bg-orange-2 text-white transition-colors duration-300 ease-out">
                                        {item.icon}
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </Content>
        </footer>
    )
}