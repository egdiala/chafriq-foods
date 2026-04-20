import { useEffect, useRef, useState } from "react";

type UseCountdownOptions = {
    initialSeconds?: number;
    autoStart?: boolean;
};

export const useCountdown = ({ initialSeconds = 120, autoStart = false }: UseCountdownOptions = {}) => {
    const [seconds, setSeconds] = useState(initialSeconds);
    const [isActive, setIsActive] = useState(autoStart);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const clear = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const start = () => {
        clear(); // 🔥 always clear before starting
        setIsActive(true);

        intervalRef.current = setInterval(() => {
            setSeconds((prev) => {
                if (prev <= 1) {
                    clear();
                    setIsActive(false); // safe here (inside callback)
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const stop = () => {
        clear();
        setIsActive(false);
    };

    const reset = (newSeconds?: number) => {
        clear();
        setSeconds(newSeconds ?? initialSeconds);
        setIsActive(false);
    };

    useEffect(() => {
        return () => clear();
    }, []);

  const isFinished = seconds === 0;

  return {
    seconds,
    isActive,
    isFinished,
    start,
    stop,
    reset,
  };
};