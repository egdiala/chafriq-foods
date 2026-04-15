import { OrderDetails } from "@/components/customer/orders/order-details";
import { SeeOtherCuisines } from "@/components/explore-cuisines/see-other-cuisines";

export default async function SingleOrderPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <>
            <OrderDetails orderId={id} />
            <SeeOtherCuisines />
        </>
    );
}