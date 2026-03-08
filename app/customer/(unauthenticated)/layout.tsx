import type { Metadata } from "next";
import { LayoutContent } from "@/components/landing/layout-content";

export const metadata: Metadata = {
    title: "Customer - Chafriq Foods",
    description: "Irresistibly tasty...",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <LayoutContent>
            {children}
        </LayoutContent>
    );
}
