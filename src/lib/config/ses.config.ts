import { EnvironmentVariables } from './environment.variables'

export const sesConfig = (configEnvs: EnvironmentVariables) => ({
    region: configEnvs.SES_REGION,
    accessKeyId: configEnvs.AWS_ACCESS_KEY_ID,
    secretAccessKey: configEnvs.AWS_SECRET_ACCESS_KEY
})
