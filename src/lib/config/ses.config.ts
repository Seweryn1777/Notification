import { EnvironmentVariables } from './environment.variables'

export const sesConfig = (configEnvs: EnvironmentVariables) => ({
    region: configEnvs.SES_REGION
})
