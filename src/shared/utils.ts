import { z } from 'zod';

type DateObject = {
  date: Date;
  timestamp: number;
  json: string;
  iso: string;
};

export function dateRangeOverlaps(
  a_start: number,
  a_end: number,
  b_start: number,
  b_end: number
): boolean {
  if (a_start <= b_start && b_start <= a_end) return true; // b starts in a
  if (a_start <= b_end && b_end <= a_end) return true; // b ends in a
  if (b_start < a_start && a_end < b_end) return true; // a in b
  return false;
}

/**
 * date - Date
 * timestamp - 1685970735895
 * json - 2023-05-31T00:00:00.000Z
 * iso - 2023-05-31
 */
export function convertDate(value: Date): DateObject {
  const dateObject = {
    date: value, // Date
    timestamp: +value, // 1685970735895
    json: value.toJSON(), // 2023-05-31T00:00:00.000Z
    iso: value.toISOString().slice(0, 10) // 2023-05-31
  };
  return dateObject;
}

export function addStringDateDays(value: string, days: number) {
  const myDate = new Date(value);
  myDate.setDate(myDate.getDate() + days);
  return myDate;
}
/**
 * format ISO 'YYYY-MM-DD'
 */
export const isoDateSchema = z.string().transform((val, ctx) => {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!val || typeof val !== 'string') {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Not valid date'
    });
    return z.NEVER;
  }
  if (!val.match(regEx)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Not valid date'
    });
    return z.NEVER;
  }
  const d = new Date(val);
  const dNum = d.getTime();
  if (!dNum && dNum !== 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Not valid date'
    });
    return z.NEVER;
  }
  if (d.toISOString().slice(0, 10) !== val) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Not valid date'
    });
    return z.NEVER;
  }
  return val;
});

type IsoDateType = z.infer<typeof isoDateSchema>;

export function isIsoDate(date: unknown): date is IsoDateType {
  return isoDateSchema.safeParse(date).success;
}

export function parseIsoToDateObject(value?: string): DateObject | null {
  if (!isIsoDate(value)) {
    return null;
  }
  return convertDate(new Date(value));
}

export function parseDate(value: string | number | Date): DateObject {
  const parsedDate = z.date().parse(new Date(value));
  return convertDate(parsedDate);
}

/**
 * Returns minimum 1
 */
export function calculateNights(startDate?: string, endDate?: string): number {
  const parsedStartDate = parseIsoToDateObject(startDate);
  const parsedEndDate = parseIsoToDateObject(endDate);
  if (!parsedStartDate || !parsedEndDate) {
    return 1;
  }

  if (parsedStartDate > parsedEndDate) {
    return 1;
  }

  const timeDiff = Math.abs(parsedEndDate.timestamp - parsedStartDate.timestamp);
  const numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return numberOfNights || 1;
}

// TODO refactor
export function calculatePrice(netPrice: number, taxPercent: number): number {
  return netPrice + netPrice * taxPercent;
}

// TODO refactor
export function calculateDiscount(number: number, nights: number): number {
  if (nights >= 3) {
    return ~~((number * 5) / 100);
  }
  return 0;
}
