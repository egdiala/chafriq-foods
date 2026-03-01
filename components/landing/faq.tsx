import { Content } from "../content"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"

const faqs = [
    { label: "What is Chafriq?", description: "" },
    { label: "Are the cooks verified?", description: "" },
    { label: "How does pickup work?", description: "" },
    { label: "Can I schedule meals ahead of time?", description: "" },
    { label: "What meals are available?", description: "" },
    { label: "How do I become a cook?", description: "" },
]

export const Faq = () => {
    return (
        <section id="faq" className="bg-orange-5">
            <Content>
                <div className="flex flex-col items-center gap-8">
                    <div className="mx-auto w-full md:max-w-176.5">
                        <h2 className="text-center font-sora text-grey-dark-0 font-extrabold text-[2.5rem] leading-12">Everything You Need to Know Before You Order</h2>
                    </div>
                    <Accordion type="single" collapsible defaultValue="item-1" className="w-full max-w-204 gap-5">
                        {
                            faqs.map((faq, index) => (
                                <AccordionItem key={index} value={`item-${index}`}>
                                    <AccordionTrigger>{faq.label}</AccordionTrigger>
                                    <AccordionContent>
                                        Yes. It adheres to the WAI-ARIA design pattern.
                                    </AccordionContent>
                                </AccordionItem>
                            ))
                        }
                    </Accordion>
                </div>
            </Content>
        </section>
    )
}