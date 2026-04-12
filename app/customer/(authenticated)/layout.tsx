import type { Metadata } from "next";
import { CustomerLayoutContent } from "@/components/customer/layout-content";

export const metadata: Metadata = {
    title: "Customer - Chafriq Foods",
    description: "Irresistibly tasty...",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <CustomerLayoutContent>
            {children}
        </CustomerLayoutContent>
    );
}
