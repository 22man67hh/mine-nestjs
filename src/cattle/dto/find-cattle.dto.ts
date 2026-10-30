import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from "class-validator";
import { CattleStage, CattleType, Gender, HealthStatus } from "./create-cattle.dto";

export class FindCattQueryDto{
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    page ?: number=1

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    limit ?: number=10

    @IsOptional()
    @IsString()
    search ?: string

    @IsEnum(CattleType)
  cattleType?: CattleType;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsEnum(CattleStage)
  stage?: CattleStage;

  @IsOptional()
  @IsEnum(HealthStatus)
  healthStatus?: HealthStatus;
}