interface VendorProfileResponse {
    first_name: string;
    last_name: string;
    email: string;
    email_status: KycStatus;
    phone_number: string;
    gender: "male" | "female";
    business_name: string;
    business_address: string;
    business_abn: string;
    business_location: {
        type: string;
        coordinates: [number, number];
    };
    business_logo: string;
    avatar: string;
    kyc_status: KycStatus;
    year_exp: number;
    home_country: string;
    home_state: string;
    home_address: string;
    home_city: string;
    home_zip: string;
    account_status: AccountStatus;
    signup_stage: SignupStage;
    suspend_reason: string;
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