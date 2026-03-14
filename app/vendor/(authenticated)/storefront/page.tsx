import { Content } from "@/components/content";
import { VendorStorefrontContent } from "@/components/vendor/storefront/storefront-content";

export default function VendorStorefront() {
    return (
        <section className="flex-1 lg:rounded-3xl bg-white">
            <Content className="py-6! lg:py-8 md:px-4">
                <VendorStorefrontContent />
            </Content>
        </section>
    )
}