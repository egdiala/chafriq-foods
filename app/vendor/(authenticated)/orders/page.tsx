import { Content } from "@/components/content";
import { VendorOrdersContent } from "@/components/vendor/orders/orders-content";

export default function VendorDashboard() {
    return (
        <section className="flex-1 lg:rounded-3xl bg-white">
            <Content className="py-6! lg:py-8 md:px-4">
                <VendorOrdersContent />
            </Content>
        </section>
    )
}