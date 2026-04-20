import Link from "next/link";
import { Content } from "@/components/content";
import { VendorEditCuisineContent } from "@/components/vendor/storefront/edit-cuisine-content";
import { Breadcrumb, BreadcrumbSeparator, BreadcrumbLink, BreadcrumbItem, BreadcrumbPage, BreadcrumbList } from "@/components/ui/breadcrumb";

export default async function VendorEditCuisine({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

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
                            <BreadcrumbPage>Edit Meal</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <VendorEditCuisineContent cuisineId={id} />
            </Content>
        </section>
    )
}