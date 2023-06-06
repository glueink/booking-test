import { z } from 'zod';

export function dateRangeOverlaps(a_start: number, a_end: number, b_start: number, b_end: number) {
  if (a_start <= b_start && b_start <= a_end) return true; // b starts in a
  if (a_start <= b_end && b_end <= a_end) return true; // b ends in a
  if (b_start < a_start && a_end < b_end) return true; // a in b
  return false;
}

type DateObject = {
  date: Date;
  timestamp: number;
  json: string;
  iso: string;
};

type ConvertedDateObject = DateObject & { value: string | number | Date };

export function convertDate(value: Date): ConvertedDateObject {
  const dateObject = {
    value,
    date: value, // Date
    timestamp: +value, // 1685970735895
    json: value.toJSON(), // 2023-05-31T00:00:00.000Z
    iso: value.toISOString().slice(0, 10) // 2023-05-31
  };
  console.log(dateObject);
  return dateObject;
}

export function safeParseDate(value?: string | number | Date): ConvertedDateObject | null {
  if (!value) {
    return null;
  }
  const parsedDate = z.date().safeParse(new Date(value));
  if (parsedDate.success) {
    return convertDate(parsedDate.data);
  }
  return null;
}

export function parseDate(value: string | number | Date): ConvertedDateObject {
  const parsedDate = z.date().parse(new Date(value));
  return convertDate(parsedDate);
}
