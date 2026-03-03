import { Content } from "@/components/content";
import { IconEmail, IconMapPinLine, IconPhone } from "@/components/icons";

const contactList = [
    {
        icon: <IconMapPinLine />,
        label: "Address",
        text: "2118 Thornridge Cir. Syracuse, Connecticut 35624"
    },
    {
        icon: <IconPhone />,
        label: "Call Us",
        text: "(629) 555-0129"
    },
    {
        icon: <IconEmail />,
        label: "Email Us",
        text: "felicia.reid@example.com"
    },
]

export default function ContactUsPage() {
    return (
        <section className="bg-orange-5 flex-1">
            <Content>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12.5 px-12">
                    <div className="flex flex-col gap-8 col-span-5">
                        <div className="grid gap-3">
                            <h1 className="font-sora font-extrabold text-5xl text-grey-dark-0">Contact Us</h1>
                            <p className="text-base text-grey-dark-2">Shoot us an email, give us a call, or just fill out the form to see how we can help you out!</p>
                        </div>
                        {
                            contactList.map((item, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <div className="grid place-content-center rounded-full bg-white [&>svg]:text-orange-2 [&>svg]:size-6 size-12">{item.icon}</div>
                                    <div className="flex flex-col flex-1">
                                        <span className="text-sm font-medium text-grey-dark-3">{item.label}</span>
                                        <p className="text-base text-grey-dark-0">{item.text}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="bg-white flex flex-col py-7 px-8 rounded-3xl shadow-card col-span-7">
                        <h2 className="font-semibold text-xl text-grey-dark-2">How Can We Help?</h2>
                    </div>
                </div>
            </Content>
        </section>
    );
}