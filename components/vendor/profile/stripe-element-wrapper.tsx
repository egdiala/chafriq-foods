import { Elements } from "@stripe/react-stripe-js";
import type { Stripe } from "@stripe/stripe-js";
import React from "react";

interface Props {
    client_secret: string;
    stripePromise: Promise<Stripe | null>;
    children: React.ReactNode;
}
export const StripeElementWrapper = ({ client_secret, stripePromise, children }: Props) => {
    return (
        <Elements
            stripe={stripePromise}
            options={{
                clientSecret: client_secret,
                appearance: {
                    theme: 'stripe',
                    variables: {
                        colorPrimary: '#00B75B',
                        fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
                        colorDanger: '#F04438',
                    },
                },
            }}
        >
            {children}
        </Elements>
    );
};