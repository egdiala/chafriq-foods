interface GetSchedulesQuery {
    avail_type: "1" | "2" // 1 = permanent, 2 = temporary
}

interface GetSchedulesResponse {
    _id: number;
    data: {
        schedule_id: string;
        status: 0 | 1;
        day_week: number;
        day_date: string | Date;
        start_time: string;
        end_time: string;
        timezone: string;
    }[];
    avail_type: 1 | 2;
}