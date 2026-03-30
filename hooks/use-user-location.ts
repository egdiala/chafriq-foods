import { useCallback, useState } from "react";

type LocationState = {
    latitude: number | null;
    longitude: number | null;
    loading: boolean;
    error: string | null;
};

export const useUserLocation = (onSuccess?: (coords: { latitude: number; longitude: number }) => void) => {
    const [state, setState] = useState<LocationState>({
        latitude: null,
        longitude: null,
        loading: false,
        error: null,
    });

    const getLocation = useCallback(() => {
        if (!navigator.geolocation) {
            setState((prev) => ({
                ...prev,
                error: "Geolocation is not supported by your browser",
            }));
            return;
        }

        setState((prev) => ({ ...prev, loading: true, error: null }));

        navigator.geolocation.getCurrentPosition((position) => {
            const coords = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            };

            setState({
                latitude: coords.latitude,
                longitude: coords.longitude,
                loading: false,
                error: null,
            });

            onSuccess?.(coords); // 👈 persist in your store here
        }, (error) => {
            let message = "Failed to get location";

            if (error.code === error.PERMISSION_DENIED) {
                message = "Location permission denied";
            } else if (error.code === error.TIMEOUT) {
                message = "Location request timed out";
            }

            setState((prev) => ({
                ...prev,
                loading: false,
                error: message,
            }));
        }, { enableHighAccuracy: true, timeout: 10000 });
    }, [onSuccess]);

    return {
        ...state,
        getLocation,
    };
};