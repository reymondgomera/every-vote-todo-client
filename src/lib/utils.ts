import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (str: string, limit: number = 2) => {
  if (!str) return "";

  return str.split(/\s/).reduce((response, word, index) => {
    if (index < limit) response += word.slice(0, 1);
    return response;
  }, "");
};
