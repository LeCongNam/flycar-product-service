export class CreateProductDto {
  name: string;
  description?: string;
  price: number;
  categoryId: number;
  thumbnail?: string;
}
