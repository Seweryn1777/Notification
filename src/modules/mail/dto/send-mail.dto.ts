import { ArrayNotEmpty, IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class SendMailDto {
    @IsArray()
    @ArrayNotEmpty()
    @IsEmail({}, { each: true })
    readonly to: Array<string>

    @IsString()
    readonly subject: string

    @IsString()
    readonly text: string
}
