import axios from "axios";
import { cookies } from "next/headers";

import { clearCredentials, setCredentials } from "@/lib/action";

export const api = axios.create({
    baseURL: `${process.env.BACKEND_API_URL}`,
    headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
    },
});

const refreshToken = async (access_token: string, refresh_token: string) => {
    const response = await api.post("auth/refresh", { refresh_token }, {
        headers: {
          "Authorization": `Bearer ${access_token}`
        }
      });
    if (!response.data) {
        throw new Error("FAILED_TO_REFRESH_TOKEN");
    }
    return response.data as RefreshTokenResponse;
};

api.interceptors.response.use((response) => response, async (error) => {
    const config = error.config;

    // Check that the error is an unauthorized, the request has not already been retried, and we have a refreshToken
    if (error?.response?.status === 401) {
        config._retry = true; // mark that we have retried this request
        const cookieStore = await cookies();
        const accessTokenValue = cookieStore.get("access_token")?.value;
        const refreshTokenValue = cookieStore.get("refresh_token")?.value;

        if (refreshTokenValue && accessTokenValue) {
            try {
                const response = await refreshToken(accessTokenValue, refreshTokenValue);

                if (response.access_token && response.refresh_token) {
                    setCredentials({
                        access_token: response.access_token,
                        refresh_token: response.refresh_token,
                    });
                    // Retry original request with new JWT
                    config.headers = {
                        ...config.headers,
                        Authorization: `Bearer ${response.access_token}`,
                    };
                    return api.request(config);
                }
            } catch (refreshErr) {
                await clearCredentials();
                return Promise.reject(refreshErr);
            }
        }
    }

    return Promise.reject(error);
});

export const handleErrorMessage = (error: any) => {
    return (error?.response?.data?.detail || error?.response?.data?.message || error?.message || "An unknown error occurred");
};
