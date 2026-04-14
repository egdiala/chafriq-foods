import Link from "next/link";
import { Content } from "@/components/content";
import { Faq } from "@/components/landing/faq";
import { DownloadOurApp } from "@/components/landing/download-our-app";
import { CheckoutContent } from "@/components/customer/checkout/checkout-content";
import { SeeOtherCuisines } from "@/components/explore-cuisines/see-other-cuisines";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function CustomerCheckout() {
    return (
        <>
        <section className="flex-1 lg:rounded-3xl bg-white">
            <Content className="py-8 lg:py-12.5">
                <Breadcrumb className="mb-3">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/customer">Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>   
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/customer/cart">Cart</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Checkout</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <CheckoutContent />
            </Content>
        </section>
        <SeeOtherCuisines />
        <DownloadOurApp />
        <Faq />
        </>
    )
}