import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateBikeDto {
    @IsNotEmpty()
    @IsString()
    make: string;

    @IsNotEmpty()
    @IsString()
    model: string;

    @IsNotEmpty()
    @IsInt()
    year: number;

    @IsNotEmpty()
    @IsString()
    type: string;
}
