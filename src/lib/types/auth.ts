export type DecodedNeiToken = {
    exp: number
    userUUID: string
}

export enum AuthStrategy {
    JWT = 'jwt'
}
