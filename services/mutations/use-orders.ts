import { useTRPC } from "@/trpc/client";
import { toast } from 'sonner';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/use-cart";

export const useUpdateVendorOrderStatus = (fn?: (value: unknown) => void) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient()
    return useMutation(
        trpc.orders.vendor.updateOrderStatus.mutationOptions({
            onSuccess: async (data) => {
                await queryClient.invalidateQueries({ queryKey: trpc.orders.vendor.getOrders.queryKey() })
                await queryClient.invalidateQueries({ queryKey: trpc.orders.vendor.getOrder.queryKey() })
                fn?.(data.data);
                toast.success("Order status updated successfully")
            },
            onError: (error) => {
                toast.error(error.message || "Something went wrong");
            },
        })
    );
}

export const useUploadVendorOrderFiles = (fn?: (value: unknown) => void) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (payload: { formData: FormData; orderId: string; }) => {
            const res = await fetch(`/api/vendor/upload-order-files/${payload.orderId}`, {
                method: "PATCH",
                body: payload.formData,
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error?.error || "Upload failed");
            }

            return res.json();
        },
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: trpc.orders.vendor.getOrders.queryKey() })
            await queryClient.invalidateQueries({ queryKey: trpc.orders.vendor.getOrder.queryKey() })
            fn?.(data);
            toast.success("Files uploaded successfully");
        },
        onError: (error) => {
            toast.error(error.message || "Something went wrong");
        },
    });
}

export const useAddToCart = (msg?: string, fn?: (value: unknown) => void) => {
    const trpc = useTRPC();
    const router = useRouter();
    const queryClient = useQueryClient();
    return useMutation(
        trpc.orders.customer.addToCart.mutationOptions({
            onSuccess: async (data) => {
                await queryClient.invalidateQueries({ queryKey: trpc.orders.customer.getCart.queryKey() })
                await queryClient.invalidateQueries({ queryKey: trpc.orders.customer.getOrders.queryKey() })
                fn?.(data.data);
                toast.success(msg || "Added to cart successfully", {
                    action: {
                        label: 'View Cart',
                        onClick: () => router.push("/customer/cart")
                    }
                })
            },
            onError: (error) => {
                toast.error(error.message || "Something went wrong");
            },
        })
    );
}

export const useCheckout = (fn?: (value: unknown) => void) => {
    const trpc = useTRPC();
    const { setCheckoutInfo } = useCart();
    const queryClient = useQueryClient();
    return useMutation(
        trpc.orders.customer.proceedToCheckout.mutationOptions({
            onSuccess: async (data) => {
                setCheckoutInfo(data.data)
                await queryClient.invalidateQueries({ queryKey: trpc.orders.customer.getCart.queryKey() })
                await queryClient.invalidateQueries({ queryKey: trpc.orders.customer.getOrders.queryKey() })
                fn?.(data.data);
                toast.success("Checkout successful")
            },
            onError: (error) => {
                toast.error(error.message || "Something went wrong");
            },
        })
    );
}

export const useConfirmPayment = (fn?: (value: unknown) => void) => {
    const trpc = useTRPC();
    const { setCheckoutInfo } = useCart();
    const queryClient = useQueryClient();
    return useMutation(
        trpc.orders.customer.confirmPayment.mutationOptions({
            onSuccess: async (data) => {
                setCheckoutInfo(null)
                await queryClient.invalidateQueries({ queryKey: trpc.orders.customer.getCart.queryKey() })
                await queryClient.invalidateQueries({ queryKey: trpc.orders.customer.getOrders.queryKey() })
                fn?.(data.data);
                toast.success("Payment verification successful")
            },
            onError: (error) => {
                toast.error(error.message || "Something went wrong");
            },
        })
    );
}