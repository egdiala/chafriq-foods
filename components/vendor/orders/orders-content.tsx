import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrderCard } from "./order-card"

export const VendorOrdersContent = () => {
    return (
        <Tabs defaultValue="pending">
            <TabsList>
                <TabsTrigger value="pending">Pending Orders</TabsTrigger>
                <TabsTrigger value="all">All Orders</TabsTrigger>
            </TabsList>
            <TabsContent value="pending" className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,420px))]">
                {
                    Array.from({ length: 6 }).map((_order, index) => (
                        <OrderCard key={index} />
                    ))
                }
            </TabsContent>
            <TabsContent value="all" className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,420px))]">
                {
                    Array.from({ length: 10 }).map((_order, index) => (
                        <OrderCard key={index} />
                    ))
                }
            </TabsContent>
        </Tabs>
    )
}