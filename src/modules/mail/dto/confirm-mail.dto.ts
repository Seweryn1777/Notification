import { IsEmail, IsString } from 'class-validator'

export class ConfirmMailDto {
    @IsEmail()
    readonly to: string

    @IsString()
    readonly appLink: string
}
