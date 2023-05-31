import { PropertyItemSchema, type PropertyItem } from './types';

export function parsePropertyItem(payload: unknown): PropertyItem {
  const parsedPayload = PropertyItemSchema.parse(payload);
  return parsedPayload;
}
