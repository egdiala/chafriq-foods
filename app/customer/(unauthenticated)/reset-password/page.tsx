import { Content } from "@/components/content";
import { CustomerResetPasswordContent } from "@/components/customer/auth/reset-password-content";

export default function CustomerResetPasswordPage() {
    return (
        <section className="flex-1">
            <Content>
                <CustomerResetPasswordContent />
            </Content>
        </section>
    )
}