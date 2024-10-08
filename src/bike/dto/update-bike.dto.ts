import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateBikeDto {
    @IsOptional()
    @IsString()
    make?: string;

    @IsOptional()
    @IsString()
    model?: string;

    @IsOptional()
    @IsInt()
    year?: number;

    @IsOptional()
    @IsString()
    type?: string;
}
