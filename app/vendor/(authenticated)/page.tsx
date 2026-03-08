import { Content } from "@/components/content";
import { VendorDashboardContent } from "@/components/vendor/dashboard/dashboard-content";

export default function VendorDashboard() {
    return (
        <section className="flex-1 lg:rounded-3xl bg-white">
            <Content className="py-6! lg:py-8 md:px-4">
                <VendorDashboardContent />
            </Content>
        </section>
    )
}