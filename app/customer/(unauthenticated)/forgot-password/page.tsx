import { Content } from "@/components/content";
import { CustomerForgotPasswordContent } from "@/components/customer/auth/forgot-password-content";

export default function CustomerForgotPasswordPage() {
    return (
        <section className="flex-1">
            <Content>
                <CustomerForgotPasswordContent />
            </Content>
        </section>
    )
}