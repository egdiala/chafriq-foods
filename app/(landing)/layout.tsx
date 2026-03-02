import type { Metadata } from "next";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";

export const metadata: Metadata = {
    title: "Chafriq Foods",
    description: "Irresistibly tasty...",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="relative">
            <Header />
            {children}
            <Footer />
        </main>
    );
}
