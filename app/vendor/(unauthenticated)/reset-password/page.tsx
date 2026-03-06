import { Content } from "@/components/content";
import { VendorResetPasswordContent } from "@/components/vendor/auth/reset-password-content";

export default function VendorResetPasswordPage() {
    return (
        <section className="flex-1">
            <Content>
                <VendorResetPasswordContent />
            </Content>
        </section>
    )
}