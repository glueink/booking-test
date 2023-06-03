import { z } from 'zod';

export function dateRangeOverlaps(a_start: number, a_end: number, b_start: number, b_end: number) {
  if (a_start <= b_start && b_start <= a_end) return true; // b starts in a
  if (a_start <= b_end && b_end <= a_end) return true; // b ends in a
  if (b_start < a_start && a_end < b_end) return true; // a in b
  return false;
}

export function parseDate(value?: string | number | Date): {
  date: Date;
  dateTimestamp: number;
  dateJSON: string;
  dateISO: string;
} {
  let dateTest = new Date();
  if (value) {
    dateTest = z.date().parse(new Date(value));
  }
  // error handler or something
  const dateObject = {
    date: dateTest,
    dateTimestamp: +dateTest,
    dateJSON: dateTest.toJSON(), // 2023-05-31T00:00:00.000Z
    dateISO: dateTest.toISOString().slice(0, 10) // 2023-05-31
  };
  console.log(dateObject);
  return dateObject;
}
