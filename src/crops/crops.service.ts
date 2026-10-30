import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';
import { DatabaseService } from 'src/database/database.service';
import { FindCropsQueryDto } from './dto/find-crops-query.dto/find-crops-query.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CropsService {
  constructor(private readonly prisma: DatabaseService) {}
  async create(userId: number, createCropDto: CreateCropDto) {
    return this.prisma.crop.create({
      data: {
        ...createCropDto,
        userId,
      },
    });
  }

  async findAll(userId: number, query: FindCropsQueryDto) {
    const { page = 1, limit = 1, cropType } = query;
    const skip = (page - 1) * limit;
    const where: Prisma.CropWhereInput = {
      userId: userId,
      ...(cropType && { cropType: cropType }),
    };
    const [total, crops] = await this.prisma.$transaction([
      this.prisma.crop.count({ where }),
      this.prisma.crop.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);
    const totalPages = Math.ceil(total / limit);
    return {
      crops,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };
  }

  async findOne(id: number) {
    return this.prisma.crop.findUnique({ where: { id } });
  }

  async update(id: number, userId: number, updateCropDto: UpdateCropDto) {
    const crop = await this.prisma.crop.findUnique({ where: { id } });
    if (!crop) {
      throw new NotFoundException('crop not found');
    }
    if (crop.userId !== userId) {
      throw new ForbiddenException('you are not allowed to update this crop');
    }
    return this.prisma.crop.update({
      where: { id },
      data: updateCropDto,
      include: {
        user: true,
      },
    });
  }

  async remove(id: number, userId: number) {
    const crop = await this.prisma.crop.findUnique({
      where: { id },
      select: { userId: true },
    });
    if (!crop) {
      throw new NotFoundException('crop not found');
    }
    if (crop.userId !== userId) {
      throw new ForbiddenException('you are not allowed to delete this crop');
    }
    return this.prisma.crop.delete({
      where: { id },
    });
  }
}
