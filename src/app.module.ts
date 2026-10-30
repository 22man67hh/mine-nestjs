import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { MailServiceService } from './mail-service/mail-service.service';
import { MailModule } from './mail/mail.module';
import { CropsModule } from './crops/crops.module';
import { CattleModule } from './cattle/cattle.module';

@Module({
  imports: [UserModule, AuthModule,ConfigModule.forRoot({
    isGlobal:true
  }), DatabaseModule, MailModule, CropsModule, CattleModule],
  controllers: [AppController],
  providers: [AppService, MailServiceService],
})
export class AppModule {}
