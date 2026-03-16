import Link from "next/link";
import { Content } from "@/components/content";
import { VendorEditCuisineContent } from "@/components/vendor/storefront/edit-cuisine-content";
import { Breadcrumb, BreadcrumbSeparator, BreadcrumbLink, BreadcrumbItem, BreadcrumbPage, BreadcrumbList } from "@/components/ui/breadcrumb";

export default function VendorEditCuisine() {
    return (
        <section className="flex-1 lg:rounded-3xl bg-white">
            <Content className="py-6! lg:py-8 md:px-4 space-y-12.5 max-w-4xl">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/vendor/storefront">Storefront</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>   
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Edit Cuisine</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <VendorEditCuisineContent />
            </Content>
        </section>
    )
}