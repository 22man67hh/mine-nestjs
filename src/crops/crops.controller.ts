import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { CropsService } from './crops.service';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decoraters/current-user.decoraters';
import { FindCropsQueryDto } from './dto/find-crops-query.dto/find-crops-query.dto';

@Controller('crops')
@UseGuards(JwtAuthGuard)
export class CropsController {
  constructor(private readonly cropsService: CropsService) {}

  @Post()
  create(
    @CurrentUser('id') userId: number,
    @Body() createCropDto: CreateCropDto,
  ) {
    return this.cropsService.create(userId, createCropDto);
  }

  @Get()
  findAll(
    @CurrentUser('id') userId: number,
    @Query(new ValidationPipe({ transform: true })) query: FindCropsQueryDto,
  ) {
    return this.cropsService.findAll(userId, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cropsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('id') userId: number,
    @Body() updateCropDto: UpdateCropDto,
  ) {
    return this.cropsService.update(id, userId, updateCropDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser('id') userId: number) {
    return this.cropsService.remove(+id, userId);
  }
}
