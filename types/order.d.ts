interface GetVendorOrderResponse {
    order_id: string;
    menu_id: string;
    order_ref: string;
    item_id: string;
    menu_name: string;
    quantity_size: number;
    quantity_unit: string;
    amount_total: number;
    amount_paid: number;
    cooking_hour: number;
    menu_content: string;
    additional_note: string;
    allegen_note: string;
    order_start_date: string | Date;
    order_end_date: string | Date;
    order_status: OrderStatus
    customer_rating_count: number;
    customer_rating_comment: string;
    platform_fee: {
        amount: number;
        percent: number;
    },
    createdAt: string | Date;
    updatedAt: string | Date;
    __v: number;
    order_paid_at: string | Date;
    receiver_name: string;
    receiver_phone: string;
    pickup_note: string;
    menu_img: string;
}

type OrderStatus = 1 | 2 | 3 | 4 | 5;

interface GetOrderStatusCountResponse {
    total_count: number;
    total_new: number;
    total_ongoing: number;
    total_completed: number;
    total_canceled: number;
    changes: {
        total_count: {
            value: number;
            direction: "up" | "down"
        },
        total_new: {
            value: number;
            direction: "up" | "down"
        },
        total_ongoing: {
            value: number;
            direction: "up" | "down"
        },
        total_completed: {
            value: number;
            direction: "up" | "down"
        },
        total_canceled: {
            value: number;
            direction: "up" | "down"
        }
    }
}

interface GetSingleVendorOrderResponse {
    menu_id: string;
    order_ref: string;
    item_id: string;
    menu_name: string;
    quantity_size: number;
    quantity_unit: string;
    amount_total: number;
    amount_paid: number;
    cooking_hour: number;
    menu_content: string;
    additional_note: string;
    allegen_note: string;
    order_start_date: string | Date;
    order_end_date: string | Date;
    order_status: OrderStatus;
    order_images: {
        mime_type: string;
        file_url: string;
        image_id: string;
    }[];
    customer_rating_count: number;
    customer_rating_comment: string;
    platform_fee: {
        amount: number;
        percent: number;
    },
    createdAt: string | Date;
    updatedAt: string | Date;
    __v: number;
    order_paid_at: string | Date;
    receiver_name: string;
    receiver_phone: string;
    pickup_note: string;
    order_id: string;
    menu_img: string;
}

interface GetCartResponse {
    _id: null;
    cart_id: string;
    receiver_name: string;
    receiver_phone: string;
    pickup_note: string;
    data: GetCartItemResponse[];
}

interface GetCartItemResponse {
    menu_id: string;
    quantity_size: number;
    order_date: string | Date;
    order_start_date: string | Date;
    order_end_date: string | Date;
    timezone: string;
    file_url: string;
    menu_name: string;
    menu_content: string;
    quantity_unit: string;
    item_min_order: number;
    item_quantity_size: number;
    item_cooking_hour: number;
    item_quantity_amount: string;
    order_amount: number;
}