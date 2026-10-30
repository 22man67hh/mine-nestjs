import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export enum CropType {
  WHEAT = 'WHEAT',
  RICE = 'RICE',
  FLOUR = 'FLOUR',
  CORN = 'CORN',
  VEGETABLE = 'VEGETABLE',
  FRUIT = 'FRUIT',
  PULSES = 'PULSES',

  COTTON = 'COTTON',
  OTHER = 'OTHER',
}

export class CreateCropDto {
  @IsString()
  @IsNotEmpty({ message: 'name is required' })
  name!: string;

  @IsOptional()
  image?: string;
  @IsString()
  @IsNotEmpty()
  plantDate!: string;
  @IsOptional()
  @IsString()
  harvestDate?: string;
  @IsEnum(CropType, {
    message: `crop type be must be one of ${Object.values(CropType)}`,
  })
  cropType!: CropType;
  @IsOptional()
  @IsInt()
  @IsPositive()
  quantity?: number;
  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  unit!: string;
 
}
