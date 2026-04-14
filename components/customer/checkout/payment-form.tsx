import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import React, { useState, useEffect } from 'react';
import { useCustomerProfile } from '@/services/queries/use-account';
import { useConfirmPayment } from '@/services/mutations/use-orders';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/base-dialog';
import { useCart } from '@/context/use-cart';


interface CheckoutFormProps {
  transactionId: string;
  secret: string;
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const PaymentForm = ({ open, setOpen, transactionId }: CheckoutFormProps) => {
    const stripe = useStripe();
    const elements = useElements();
    const { checkoutInfo } = useCart()
    const handleClose = () => setOpen(false);
    const { data: profile } = useCustomerProfile();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!stripe) return;

        // This checks the URL for a redirect from Stripe
        const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret');

        if (!clientSecret) return;

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent?.status) {
                case 'succeeded':
                    toast.success('Payment succeeded!');
                    break;
                case 'processing':
                    toast.info('Your payment is processing.');
                    break;
                default:
                    toast.error('Payment failed. Please try again.');
                    break;
            }
        });
    }, [stripe]);

    const { mutate, isPending } = useConfirmPayment(handleClose);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required',
            confirmParams: {
                receipt_email: profile?.data?.email,
            },
        });

        if (paymentIntent && paymentIntent.status === 'succeeded') {
            mutate(transactionId);
            setIsLoading(false);
            return;
        }

        if (error?.type === 'card_error' || error?.type === 'validation_error') {
            toast.error(error?.message || 'An unexpected error occurred.');
        } else {
            toast.error('An unexpected error occurred.');
        }

        setIsLoading(false);
    };
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle className="font-semibold text-lg">Payment for Order #{checkoutInfo?.order_ref}</DialogTitle>
                </DialogHeader>
                <form id='payment-form' className='space-y-5' onSubmit={handleSubmit}>
                    <div>
                        <PaymentElement id='payment-element' />
                    </div>

                    <DialogFooter className='flex flex-row! items-center [&_button]:flex-1'>
                        <DialogClose render={
                            <Button variant="outline">Cancel</Button>
                        } />
                        <Button type="submit" disabled={isLoading || !stripe || !elements || isPending}>
                            Pay now
                            {(isLoading || isPending) && (<Spinner className="absolute right-4 size-5" />)}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}