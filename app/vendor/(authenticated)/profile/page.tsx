import { Content } from "@/components/content";
import { VendorProfileContent } from "@/components/vendor/profile/profile-content";

export default function VendorProfile() {
    return (
        <section className="flex-1 lg:rounded-3xl bg-white">
            <Content className="py-6! lg:py-8 md:px-4">
                <VendorProfileContent />
            </Content>
        </section>
    )
}