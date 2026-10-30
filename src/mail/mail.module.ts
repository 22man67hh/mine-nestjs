import { Module } from '@nestjs/common';
import { MailServiceService } from 'src/mail-service/mail-service.service';

@Module({
    providers:[MailServiceService],
    exports:[MailServiceService]
})
export class MailModule {}
