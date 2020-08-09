import { IsNotEmpty } from 'class-validator';

export class ItemsDto {
    @IsNotEmpty()
    readonly items: [];
}