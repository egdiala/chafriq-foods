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