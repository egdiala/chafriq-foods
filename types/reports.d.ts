interface ReportsStatisticsResponse {
    kpi: {
        total_orders: number;
        total_orders_change: number;
        total_earnings: number;
        total_earnings_change: number;
        avg_order_value: number;
        avg_order_value_change: number;
        repeat_customers: number;
        repeat_customers_change: number;
    },
    order_trend: {
        total_count: number;
        month: string | Date;
    }[];
    earnings_trend: {
        total_earnings: number;
        month: string | Date;
    }[];
    top_meals: {
        menu_name: string;
        total_count: number;
        file_url: string;
        menu_id: string;
    }[];
    fulfillment: {
        completed_pct: number;
        cancelled_pct: number;
        completed: number;
        cancelled: number;
        total: 1
    },
    avg_prep_time: {
        minutes: number;
        change_pct: number;
    },
    rating_trend: []
}