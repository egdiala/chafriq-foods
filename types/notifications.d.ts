interface GetVendorNotificationResponse {
    user_id: string;
    notification: {
        title: string;
        body: string;
    };
    createdAt: string | Date;
    updatedAt: string | Date;
    notification_id: string;
    status: 0 | 1;
}