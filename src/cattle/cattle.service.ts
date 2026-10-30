import { Injectable } from '@nestjs/common';
import { CreateCattleDto } from './dto/create-cattle.dto';
import { UpdateCattleDto } from './dto/update-cattle.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CattleService {
  constructor(private readonly prisma: DatabaseService) {}
  async create(userId: number, createCattleDto: CreateCattleDto) {
    return this.prisma.cattle.create({
      data: {
        ...createCattleDto,
        userId,
      },
    })
  }


  findAll() {
    return `This action returns all cattle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cattle`;
  }

  update(id: number, updateCattleDto: UpdateCattleDto) {
    return `This action updates a #${id} cattle`;
  }

  remove(id: number) {
    return `This action removes a #${id} cattle`;
  }
}
