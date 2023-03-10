export interface OrderCreateDto {
  user: string;
  productsOrdered: Array<{
    productCode: number;
    ordered: number;
  }>;
}
