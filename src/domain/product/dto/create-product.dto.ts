import { IsArray, IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description?: string;

  @IsNumber()
  @Min(1000)
  price: number;

  @IsString()
  categoryId: number;

  @IsString()
  thumbnail?: string;

  @IsArray()
  @IsString({ each: true })
  images: Array<string>;
}
