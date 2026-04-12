import { Content } from "@/components/content";
import { CustomerProfileContent } from "@/components/customer/profile/profile-content";

export default function CustomerProfile() {
    return (
        <section className="flex-1 lg:rounded-3xl bg-white">
            <Content className="py-6! lg:py-8">
                <CustomerProfileContent />
            </Content>
        </section>
    )
}