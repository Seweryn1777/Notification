import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { ConfigModule } from '@nestjs/config'
import { getConfig, envValidation } from 'lib/config'
import { MailModule } from 'modules/mail'
import { AuthModule } from 'modules/auth'
import { HealthCheckModule } from 'modules/health-check'
import { AppService } from './app.service'

@Module({
    imports: [
        AuthModule,
        MailModule,
        HealthCheckModule,
        ConfigModule.forRoot({
            isGlobal: true,
            validate: envValidation,
            validationOptions: {
                allowUnknown: true,
                abortEarly: true
            }
        }),
        ThrottlerModule.forRoot(getConfig().throttlerConfig)
    ],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        }
    ]
})
export class AppModule {}
