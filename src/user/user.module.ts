import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [DatabaseModule, MailModule],
  exports: [UserService],
})
export class UserModule {}
