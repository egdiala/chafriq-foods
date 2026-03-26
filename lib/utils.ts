import { clsx, type ClassValue } from "clsx"
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