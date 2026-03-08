import { Content } from "@/components/content";
import { CustomerRegisterContent } from "@/components/customer/auth/register-content";

export default function CustomerRegisterPage() {
    return (
        <section className="flex-1">
            <Content>
                <CustomerRegisterContent />
            </Content>
        </section>
    )
}