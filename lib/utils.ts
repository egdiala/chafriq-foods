import { clsx, type ClassValue } from "clsx"
import { format, formatDuration, intervalToDuration, set } from "date-fns";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const normalizeNumberInput = (value: string, max = 100, decimals = 2) => {
  // Remove non-numeric characters except dot
  const cleaned = value.replace(/[^0-9.]/g, "");

  // Split integer and fractional parts
  const [intPart, fracPart] = cleaned.split(".");

  // Remove leading zeros for integers (except "0")
  const normalizedInt = intPart === "0" ? "0" : intPart.replace(/^0+/, "");

  // Limit decimals
  const normalizedFrac = fracPart ? fracPart.slice(0, decimals) : "";

  // Recombine
  let finalValue = normalizedFrac ? `${normalizedInt}.${normalizedFrac}` : normalizedInt;

  // Clamp to max
  if (Number(finalValue) > max) {
    finalValue = String(max);
  }

  return finalValue;
};

export const normalizeDecimalInput = (value: string, decimals = 2) => {
  // Remove everything except digits and dot
  let cleaned = value.replace(/[^0-9.]/g, "");

  // Prevent multiple dots
  const parts = cleaned.split(".");
  if (parts.length > 2) {
    cleaned = parts[0] + "." + parts.slice(1).join("");
  }

  let [intPart = "", fracPart = ""] = cleaned.split(".");

  // Handle ".5" → "0.5"
  if (intPart === "" && cleaned.startsWith(".")) {
    intPart = "0";
  }

  // Remove leading zeros (but keep single "0")
  if (intPart !== "0") {
    intPart = intPart.replace(/^0+/, "") || "0";
  }

  // Limit decimal places
  fracPart = fracPart.slice(0, decimals);

  // Rebuild value
  return cleaned.includes(".")
    ? `${intPart}.${fracPart}`
    : intPart;
};

export const appendQueryParams = (url: string, params: QueryParams): string => {
  const parsedUrl = new URL(url, "http://dummy-base"); // supports relative URLs

  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "") return;

    if (Array.isArray(value)) {
      value.forEach((v) => parsedUrl.searchParams.append(key, String(v)));
    } else {
      parsedUrl.searchParams.set(key, String(value));
    }
  });

  const result = parsedUrl.toString();

  // Remove dummy origin if the input URL was relative
  return url.startsWith("http") ? result : result.replace(parsedUrl.origin, "");
};

export const formatTime = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);

  const date = set(new Date(), {
    hours,
    minutes,
    seconds: 0,
    milliseconds: 0,
  });

  return format(date, "hh:mmaaa"); // "09:00AM"
};

export const formatHours = (hours: number) => {
  if (!hours || hours <= 0) return "0 sec";

  const totalSeconds = Math.round(hours * 60 * 60);

  const duration = intervalToDuration({
    start: 0,
    end: totalSeconds * 1000,
  });

  return formatDuration(duration, {
    format: ["hours", "minutes", "seconds"],
  });
};