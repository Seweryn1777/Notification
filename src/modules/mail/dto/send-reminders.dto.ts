import { Type } from 'class-transformer'
import { ArrayMinSize, IsArray, IsUUID, ValidateNested } from 'class-validator'
import { AppointmentDto } from './appointment.dto'

export class SendRemindersDto {
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => AppointmentDto)
    readonly reminders: Array<AppointmentDto>
}
