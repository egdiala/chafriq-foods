interface CreateMenuResponse {
    menu_id: string;
}

interface GetMenuResponse {
    cook_id: string;
    menu_name: string;
    quantity_size: number;
    quantity_unit: string;
    min_order: number;
    menu_content: string;
    menu_amount: number;
    cooking_hour: number;
    additional_note: string;
    allegen_note: string;
    allegen_list: {
        _id: string;
        name: string;
        allegen_id: string;
    }[];
    allegen_trace: {
        _id: string;
        name: string;
        allegen_id: string;
    }[];
    dish_list: {
        name: string;
        dish_type_id: string;
    }[];
    status: 0 | 1;
    createdAt: string | Date;
    dish_list_data: {
        name: string;
        dish_type_id: string;
    }[];
    menu_id: string;
    file_url: string;
    image_data: {
        mime_type: string;
        file_url: string;
        image_id: string;
    }[]
}