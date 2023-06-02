import { EnvironmentVariables } from './environment.variables'

export const mailConfig = (configEnvs: EnvironmentVariables) => ({
    from: configEnvs.FROM_ADDRESS,
    adminEmail: configEnvs.ADMIN_EMAIL
})
