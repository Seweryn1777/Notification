import { IsString } from 'class-validator'
import { AppointmentDto } from './appointment.dto'

export class CancellationDto extends AppointmentDto {
    @IsString()
    readonly teacherMessage: string
}
