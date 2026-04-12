"use client"

import { useCustomerProfile } from "@/services/queries/use-account"
import { CustomerHeader } from "./header"
import { Footer } from "../landing/footer"


export const CustomerLayoutContent = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    useCustomerProfile()
    
    return (
        <main className="relative flex flex-col min-h-full">
            <CustomerHeader />
            {children}
            <Footer />
        </main>
    )
}