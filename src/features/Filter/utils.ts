import { isIsoDate, addStringDateDays } from '@/shared';
import type { FilterType } from './types';

export function validateFilter(startDate: unknown, endDate: unknown): FilterType | null {
  if (!isIsoDate(startDate) || !isIsoDate(endDate)) {
    return null;
  }
  if (addStringDateDays(startDate, 1) > new Date(endDate)) {
    return null;
  }
  return {
    startDate,
    endDate
  };
}
