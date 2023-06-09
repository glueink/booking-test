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

export function convertDate(value: Date): DateObject {
  const dateObject = {
    date: value, // Date
    timestamp: +value, // 1685970735895
    json: value.toJSON(), // 2023-05-31T00:00:00.000Z
    iso: value.toISOString().slice(0, 10) // 2023-05-31
  };
  console.log(dateObject);
  return dateObject;
}

export function safeParseDate(value?: string | number | Date): DateObject | null {
  if (!value) {
    return null;
  }
  const parsedDate = z.date().safeParse(new Date(value));
  if (parsedDate.success) {
    return convertDate(parsedDate.data);
  }
  return null;
}

export function parseDate(value: string | number | Date): DateObject {
  const parsedDate = z.date().parse(new Date(value));
  return convertDate(parsedDate);
}

export function guardStartEnd(start: unknown, end: unknown) {
  if (!start || !end) {
    return null;
  }

  const parsedStartDate = safeParseDate(String(start));
  const parsedEndDate = safeParseDate(String(end));
  if (!parsedStartDate || !parsedEndDate || parsedStartDate.timestamp > parsedEndDate.timestamp) {
    return null;
  }

  return {
    startDate: parsedStartDate.iso,
    endDate: parsedEndDate.iso
  };
}

// return minimum 1
export function calculateNights(
  startDate?: string | number | Date,
  endDate?: string | number | Date
): number {
  const parsedStartDate = safeParseDate(startDate);
  const parsedEndDate = safeParseDate(endDate);
  if (!parsedStartDate || !parsedEndDate) {
    return 1;
  }
  return ~~((parsedEndDate.timestamp - parsedStartDate.timestamp) / 1000 / 60 / 60 / 24) || 1;
}

export function calculatePrice(netPrice: number, taxPercent: number) {
  return netPrice + netPrice * taxPercent;
}

export function calculateDiscount(number: number, nights: number) {
  if (nights >= 3) {
    return ~~((number * 5) / 100);
  }
  return 0;
}

// format ISO 'YYYY-MM-DD'
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
