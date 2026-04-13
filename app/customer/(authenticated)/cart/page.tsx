import Link from "next/link";
import { Content } from "@/components/content";
import { CartContent } from "@/components/customer/cart/cart-content";
import { SeeOtherCuisines } from "@/components/explore-cuisines/see-other-cuisines";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { DownloadOurApp } from "@/components/landing/download-our-app";
import { Faq } from "@/components/landing/faq";

export default function CustomerCart() {
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
                            <BreadcrumbPage>Cart</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <CartContent />
            </Content>
        </section>
        <SeeOtherCuisines />
        <DownloadOurApp />
        <Faq />
        </>
    )
}