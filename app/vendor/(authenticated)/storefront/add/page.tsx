import { Content } from "@/components/content";
import { Breadcrumb, BreadcrumbSeparator, BreadcrumbLink, BreadcrumbItem, BreadcrumbPage, BreadcrumbList } from "@/components/ui/breadcrumb";
import { VendorAddCuisineContent } from "@/components/vendor/storefront/add-cuisine-content";
import Link from "next/link";

export default function VendorAddCuisine() {
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
                            <BreadcrumbPage>Add Cuisine</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <VendorAddCuisineContent />
            </Content>
        </section>
    )
}