import { Content } from "@/components/content";
import { VendorReportingContent } from "@/components/vendor/reporting/reporting-content";

export default function VendorReporting() {
    return (
        <section className="flex-1 lg:rounded-3xl bg-white">
            <Content className="py-6! lg:py-8 md:px-4">
                <VendorReportingContent />
            </Content>
        </section>
    )
}