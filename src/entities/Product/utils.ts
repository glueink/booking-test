import { ChargeMethod, type ProductItem } from './types';

export function getProductPriceResult(product: ProductItem, nights: number): number {
  const { priceNet, priceTaxPercentage, chargeMethod, id } = product;

  if (chargeMethod === ChargeMethod.NIGHTLY) {
    const result = (priceNet + priceNet * priceTaxPercentage) * nights;
    // 28 >= nights - free breakfast
    if (nights >= 28 && id === 1) {
      return 0;
    }
    return result;
  }
  if (chargeMethod === ChargeMethod.ONCE_PER_BOOKING) {
    return priceNet + priceNet * priceTaxPercentage;
  }

  throw new Error('ChargeMethod not supported!');
}

export function getProductDiscountResult(product: ProductItem, nights: number): number {
  const { priceNet, priceTaxPercentage, chargeMethod, id } = product;

  if (chargeMethod === ChargeMethod.NIGHTLY) {
    // 28 >= nights - free breakfast
    if (nights >= 28 && id === 1) {
      return (priceNet + priceNet * priceTaxPercentage) * nights;
    }
    return 0;
  }
  // redundant but descriptive
  if (chargeMethod === ChargeMethod.ONCE_PER_BOOKING) {
    return 0;
  }

  throw new Error('ChargeMethod not supported!');
}
