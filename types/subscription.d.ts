interface SubscriptionSetupResponse {
    plan_name: string;
    monthly_cost: number;
    yearly_cost: number;
    is_default: boolean;
    description: string[];
    status: 1 | 2;
    plansetup_id: string;
}

interface InitSubscriptionResponse {
    order_ref: string;
    client_secret: string;
    amount: number;
    app_secret: string;
    payment_id: string;
}

interface SubscriptionPlanResponse {
    plansetup_id: string;
    plan_duration: "monthly" | "yearly";
    plan_amount: number;
    start_date: Date | string;
    expiry_date: Date | string;
    status: 1;
    plansub_id: string;
    plan_name: string;
}

interface SubscriptionPlanCountResponse {
    total: number;
}