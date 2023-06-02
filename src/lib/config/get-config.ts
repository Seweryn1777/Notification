import { plainToInstance } from 'class-transformer'
import { EnvironmentVariables } from './environment.variables'
import { bodyParserConfig } from './body-parser.config'
import { expressConfig } from './express.config'
import { throttlerConfig } from './throttler.config'
import { validationPipeConfig } from './validation-pipe.config'
import { corsConfig } from './cors.config'
import { healthCheckConfig } from './health-check.config'
import { microserviceConfig } from './microservice.config'
import { authConfig } from './auth.config'
import { sesConfig } from './ses.config'
import { mailConfig } from './mail.config'

export const getConfig = () => {
    const configEnvs = plainToInstance(EnvironmentVariables, process.env, { enableImplicitConversion: true })

    return {
        bodyParserConfig: bodyParserConfig(configEnvs),
        expressConfig: expressConfig(configEnvs),
        throttlerConfig: throttlerConfig(configEnvs),
        validationPipeConfig: validationPipeConfig(),
        corsConfig: corsConfig(configEnvs),
        healthCheckConfig: healthCheckConfig(configEnvs),
        microserviceConfig: microserviceConfig(configEnvs),
        authConfig: authConfig(configEnvs),
        sesConfig: sesConfig(configEnvs),
        mailConfig: mailConfig(configEnvs)
    }
}
