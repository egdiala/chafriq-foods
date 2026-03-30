interface SearchLocationsResponse {
    name: string;
    id: string;
}

interface GetCountriesResponse {
    name: string;
    iso3: string;
    iso2: string;
    numeric_code: string;
    phone_code: string;
    capital: string;
    states: CountryState[]
}

interface CountryState {
    id: number;
    name: string;
    state_code: string;
    latitude: string;
    longitude: string;
    type: "territory" | "state"
}

interface DishListResponse {
    name: string;
    description: string;
    dish_type_id: string;
}

interface AllergiesResponse {
    name: string;
    description: string;
    allergy_id: string;
}

interface GetCooksResponse {
    business_name: string;
    business_address: string;
    business_logo: string;
    kyc_status: KycStatus;
    dish_list: {
        name: string;
        dist_type_id: string;
    }[];
    from_amount: number;
    cook_id: string;
    is_available: 0 | 1;
    total_menu: number;
    distance?: number;
}

interface GetCookResponse {
    business_name: string;
    business_address: string;
    business_logo: string;
    kyc_status: KycStatus;
    menu_list: {
        menu_name: string;
        quantity_size: number;
        quantity_unit: string;
        menu_amount: number;
        cooking_hour: number;
        menu_id: string;
    }[];
    schedule_data: {
        avail_type: 1 | 2;
        day_week: number;
        start_time: string;
        end_time: string;
        status: 0 | 1;
        day_date: string | Date;
    }[];
    cook_id: string;
    dish_list: {
        name: string;
        dist_type_id: string;
    }[];
    rating: number;
}

interface GetMealsResponse {
    business_name: string;
    business_address: string;
    distance: number;
    file_url: string;
    menu_name: string;
    quantity_size: number;
    quantity_unit: string;
    menu_amount: number;
    cooking_hour: number;
    menu_id: string;
    menu_content: string;
    distance?: number;
}