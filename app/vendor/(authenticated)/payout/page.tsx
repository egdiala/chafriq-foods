import { Content } from "@/components/content";
import { VendorPayoutContent } from "@/components/vendor/payout/payout-content";

export default function VendorPayout() {
    return (
        <section className="flex-1 lg:rounded-3xl bg-white">
            <Content className="py-6! lg:py-8 md:px-4">
                <VendorPayoutContent />
            </Content>
        </section>
    )
}