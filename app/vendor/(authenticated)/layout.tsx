import type { Metadata } from "next";
import { VendorLayoutContent } from "@/components/vendor/layout-content";

export const metadata: Metadata = {
    title: "Vendor - Chafriq Foods",
    description: "Irresistibly tasty...",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <VendorLayoutContent>
            {children}
        </VendorLayoutContent>
    );
}
