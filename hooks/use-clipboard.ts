import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface UseClipboardOptions {
    timeout?: number;
}

export function useClipboard({ timeout = 2000 }: UseClipboardOptions) {
    const [copiedText, setCopiedText] = useState<string>("");
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const copyToClipboard = useCallback(async (text: string) => {
        if (!navigator.clipboard) {
            toast.info("Clipboard API not available");
            return false;
        }

        try {
            await navigator.clipboard.writeText(text);
            setCopiedText(text);
            setIsCopied(true);
            return true;
        } catch (error) {
            console.error("Failed to copy text: ", error);
            return false;
        }
    }, []);

    useEffect(() => {
        if (isCopied) {
            const timer = setTimeout(() => {
                setIsCopied(false);
            }, timeout);

            return () => clearTimeout(timer);
        }
    }, [isCopied, timeout]);

    return {
        copiedText,
        isCopied,
        copyToClipboard,
    };
};