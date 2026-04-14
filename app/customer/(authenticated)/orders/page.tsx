import Link from "next/link";
import { Content } from "@/components/content";
import { Faq } from "@/components/landing/faq";
import { DownloadOurApp } from "@/components/landing/download-our-app";
import { CustomerOrdersContent } from "@/components/customer/orders/orders-content";
import { SeeOtherCuisines } from "@/components/explore-cuisines/see-other-cuisines";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function CustomerOrders() {
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
                            <BreadcrumbPage>Orders</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <CustomerOrdersContent />
            </Content>
        </section>
        <SeeOtherCuisines />
        <DownloadOurApp />
        <Faq />
        </>
    )
}