type RefreshTokenResponse = {
    access_token: string;
    refresh_token: string;
    token_type: string;
};

type UserType = "vendor" | "customer";

type VendorLoginResponse = {
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
    dish_list: string[];
    account_status: AccountStatus;
    signup_stage: SignupStage;
    suspend_reason: string;
    alert_settings: {
        orders: number;
        promos: number;
        platform_updates: number;
    };
    last_login_at: number;
    createdAt: Date | string;
    updatedAt: Date | string;
    cook_id: string;
    token: string;
}

type SignupStage = 1 | 2 // first or second screen completed respectively
type AccountStatus = 0 | 1 | 2 // pending | active | suspended
type KycStatus = 0 | 1 // unverified | verified

type QueryParams = Record<
  string,
  string | number | boolean | null | undefined | (string | number | boolean)[]
>;