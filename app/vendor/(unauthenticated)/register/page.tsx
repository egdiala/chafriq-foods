import { Content } from "@/components/content";
import { VendorRegisterContent } from "@/components/vendor/auth/register-content";

export default function VendorRegisterPage() {
    return (
        <section className="flex-1">
            <Content>
                <VendorRegisterContent />
            </Content>
        </section>
    )
}