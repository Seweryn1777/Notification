import { IsEmail, IsInt, IsPositive, IsString, IsUUID } from 'class-validator'

export class AppointmentDto {
    @IsUUID(4)
    readonly studentUUID: string

    @IsEmail()
    readonly studentEmail: string

    @IsString()
    readonly studentFirstName: string

    @IsString()
    readonly studentLastName: string

    @IsUUID(4)
    readonly teacherUUID: string

    @IsString()
    readonly teacherFirstName: string

    @IsString()
    readonly teacherLastName: string

    @IsEmail()
    readonly teacherEmail: string

    @IsInt()
    @IsPositive()
    readonly startDate: number
}
