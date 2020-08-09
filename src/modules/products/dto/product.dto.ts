import { IsNotEmpty } from 'class-validator';

export class ProductDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly price: number;

    readonly rules: [];
}