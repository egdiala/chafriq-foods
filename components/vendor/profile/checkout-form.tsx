import React, { useState, useEffect } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useVendorProfile } from '@/services/queries/use-account';
import { useCompleteSubscription } from '@/services/mutations/use-subscription';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/base-dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';


interface CheckoutFormProps {
  transactionId: string;
  secret: string;
}

export const CheckoutForm = ({ transactionId }: CheckoutFormProps) => {
    const [open, setOpen] = useState(true);
    const handleClose = () => setOpen(false);
    const { data: profile } = useVendorProfile();
    const stripe = useStripe();
    const elements = useElements();

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

    const { mutate, isPending } = useCompleteSubscription(handleClose);

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
                    <DialogTitle className="font-semibold text-lg">Starter Payment Subscription</DialogTitle>
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