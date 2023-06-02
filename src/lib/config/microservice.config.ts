import { Transport } from '@nestjs/microservices'
import { EnvironmentVariables } from './environment.variables'
import { redisConfig } from './redis.config'

export const microserviceConfig = (configEnvs: EnvironmentVariables) => ({
    transport: Transport.REDIS,
    options: {
        host: redisConfig(configEnvs).host,
        port: redisConfig(configEnvs).port,
        prefix: configEnvs.NOTIFICATION_MICROSERVICE_PREFIX
    }
})
