import { Module } from '@nestjs/common';
import { CattleService } from './cattle.service';
import { CattleController } from './cattle.controller';

@Module({
  controllers: [CattleController],
  providers: [CattleService],
})
export class CattleModule {}
