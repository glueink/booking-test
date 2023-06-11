import { type RoomItem } from './types';

export function getRoomPriceResult(room: RoomItem, nights: number): number {
  const { pricePerNightNet, priceTaxPercentage } = room;
  const result = (pricePerNightNet + pricePerNightNet * priceTaxPercentage) * nights;
  // 3 >= nights - discount 5%
  if (nights >= 3) {
    return result * 0.95;
  }
  return result;
}

export function getRoomDiscountResult(room: RoomItem, nights: number): number {
  const { pricePerNightNet, priceTaxPercentage } = room;
  const result = (pricePerNightNet + pricePerNightNet * priceTaxPercentage) * nights;
  // 3 >= nights - discount 5%
  if (nights >= 3) {
    return result * 0.05;
  }
  return 0;
}
