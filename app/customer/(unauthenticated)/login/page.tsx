import { Content } from "@/components/content";
import { CustomerLoginContent } from "@/components/customer/auth/login-content";

export default function CustomerLoginPage() {
    return (
        <section className="flex-1">
            <Content>
                <CustomerLoginContent />
            </Content>
        </section>
    )
}