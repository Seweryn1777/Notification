import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { MailController } from './mail.controller'
import { MailService } from './mail.service'

@Module({
    imports: [JwtModule],
    providers: [MailService],
    controllers: [MailController]
})
export class MailModule {}
