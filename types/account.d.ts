interface VendorProfileResponse {
    first_name: string;
    last_name: string;
    email: string;
    email_status: KycStatus;
    phone_number: string;
    gender: "male" | "female";
    business_name: string;
    business_username?: string;
    business_address: string;
    business_address_id: string;
    business_abn: string;
    business_location: {
        type: string;
        coordinates: [number, number];
    };
    business_logo: string;
    avatar: string;
    kyc_status: KycStatus;
    order_distance?: number;
    year_exp: number;
    home_country: string;
    home_state: string;
    home_address: string;
    home_city: string;
    home_zip: string;
    account_status: AccountStatus;
    signup_stage: SignupStage;
    suspend_reason: string;
    rating?: number;
    alert_settings: {
        orders: number;
        promos: number;
        platform_updates: number;
    },
    last_login_at: number;
    createdAt: Date | string;
    dish_data: {
        _id: string;
        name: string;
        dish_type_id: string;
    }[]
    cook_id: string;
}

interface CustomerProfileResponse {
    full_name: string;
    email: string;
    avatar: string;
    email_status: KycStatus;
    phone_number: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    gender: "male" | "female" | "";
    delivery_address: string;
    account_status: AccountStatus;
    suspend_reason: string;
    alert_settings: {
        orders: number;
        promos: number;
        platforms: number;
    },
    createdAt: Date | string;
    customer_id: string;
}