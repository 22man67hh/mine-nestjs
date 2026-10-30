import { CropType } from "@prisma/client";
import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, Max, Min } from "class-validator";

export class FindCropsQueryDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    page ?: number=1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    limit ?: number=10;


    @IsOptional()
    @IsEnum(CropType,{
        message:`Crop must be one of :${Object.values(CropType).join(', ')}`
    })
    cropType?:CropType

}
