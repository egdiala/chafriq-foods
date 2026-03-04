import { Content } from "@/components/content";
import { VendorForgotPasswordContent } from "@/components/vendor/auth/forgot-password-content";

export default function VendorForgotPasswordPage() {
    return (
        <section className="flex-1">
            <Content>
                <VendorForgotPasswordContent />
            </Content>
        </section>
    )
}