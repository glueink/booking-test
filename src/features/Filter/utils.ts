import { z } from 'zod';

// format 'YYYY-MM-DD'
const filterDateSchema = z.string().transform((val, ctx) => {
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

type DateStringType = z.infer<typeof filterDateSchema>;

function isValidFilterDate(date: unknown): date is DateStringType {
  return filterDateSchema.safeParse(date).success;
}
