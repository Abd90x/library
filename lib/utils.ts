import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AnyColumn, sql } from "drizzle-orm";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name: string): string => {
  const names = name.split(" ");
  if (names.length === 1) return names[0].charAt(0).toLocaleUpperCase();

  return (
    names[0].charAt(0).toLocaleUpperCase() +
    names[1].charAt(0).toLocaleUpperCase()
  );
};

export const increment = (column: AnyColumn, value = 1) => {
  return sql`${column} + ${value}`;
};
