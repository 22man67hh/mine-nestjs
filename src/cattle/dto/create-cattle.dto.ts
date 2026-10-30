import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum CattleType {
  COW = 'COW',
  BUFFALO = 'BUFFALO',
  BULL = 'BULL',
  OX = 'OX',
  CALF = 'CALF',
  GOAT='GOAT',
  HEN='HEN',
  OTHER = 'OTHER',
}

export enum CattleStage {
  CALF = 'CALF',
  HEIFER = 'HEIFER',
  LACTATING = 'LACTATING',
  DRY = 'DRY',
  PREGNANT = 'PREGNANT',
  BREEDING = 'BREEDING',
  EGG='EGG',
}

export enum HealthStatus {
  HEALTHY = 'HEALTHY',
  SICK = 'SICK',
  UNDER_TREATMENT = 'UNDER_TREATMENT',
  QUARANTINED = 'QUARANTINED',
  SOLD = 'SOLD',
  DECEASED = 'DECEASED',
}
export class CreateCattleDto {
    @IsNotEmpty()
    tagNumber!: string
    @IsOptional()
    name?: string

    @IsOptional()
    image!: string


    @IsNotEmpty()
    @IsString()
    breed!: string

    @IsOptional()
    description!: string
    

    @IsEnum(Gender,{
        message:`Gender must be one of :${Object.values(Gender).join(',')}`
    })
    gender!:Gender

    @IsNotEmpty()
    dateOfBirth!:Date

    @IsEnum(CattleType, {
    message: `cattleType must be one of: ${Object.values(CattleType).join(', ')}`,
  })
  cattleType!: CattleType;

  @IsOptional()
  @IsInt()
  @IsPositive()
  ageInMonths?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  weight?: number;

  @IsEnum(CattleStage, {
    message: `stage must be one of: ${Object.values(CattleStage).join(', ')}`,
  })
  stage!: CattleStage;

  @IsOptional()
  @IsEnum(HealthStatus, {
    message: `healthStatus must be one of: ${Object.values(HealthStatus).join(', ')}`,
  })
  healthStatus?: HealthStatus;
}
