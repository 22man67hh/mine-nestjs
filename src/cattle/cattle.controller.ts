import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CattleService } from './cattle.service';
import { CreateCattleDto } from './dto/create-cattle.dto';
import { UpdateCattleDto } from './dto/update-cattle.dto';

@Controller('cattle')
export class CattleController {
  constructor(private readonly cattleService: CattleService) {}

  @Post()
  create(@Body() createCattleDto: CreateCattleDto) {
    return this.cattleService.create(createCattleDto);
  }

  @Get()
  findAll() {
    return this.cattleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cattleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCattleDto: UpdateCattleDto) {
    return this.cattleService.update(+id, updateCattleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cattleService.remove(+id);
  }
}
