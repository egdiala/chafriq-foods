interface SubscriptionSetupResponse {
    plan_name: string;
    monthly_cost: number;
    yearly_cost: number;
    is_default: boolean;
    description: string[];
    status: 1;
    plansetup_id: string;
}