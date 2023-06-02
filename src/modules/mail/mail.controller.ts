import { Controller, Get, Logger, Post } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { NotificationMicroserviceCommand } from 'lib/common'
import { en_US } from 'lib/locale'
import { MailService } from './mail.service'
import { CancellationDto, ConfirmMailDto, SendMailDto, SendRemindersDto } from './dto'
import { MAIL } from './constants'
import { format, fromUnixTime, getTime } from 'date-fns'
import { getConfig } from 'lib/config'

const T = en_US

@Controller(MAIL)
export class MailController {
    private readonly logger = new Logger(MailController.name)

    constructor(private readonly mailService: MailService) {}

    @MessagePattern({ cmd: NotificationMicroserviceCommand.SendEmail })
    async sendMail(@Payload() dto: SendMailDto) {
        try {
            await this.mailService.sendMail(dto.to, dto.subject, { text: dto.text })

            return true
        } catch {
            return false
        }
    }

    @MessagePattern({ cmd: NotificationMicroserviceCommand.ConfirmMail })
    async confirmMail(@Payload() dto: ConfirmMailDto) {
        try {
            const subject = T.subject.confirmationEmail

            await this.mailService.sendMail([dto.to], subject, { text: dto.appLink })

            return true
        } catch {
            return false
        }
    }

    @MessagePattern({ cmd: NotificationMicroserviceCommand.SendReminder })
    async sendReminder(@Payload() dto: SendRemindersDto) {
        try {
            await Promise.all(
                dto.reminders.map(reminder => {
                    const time = format(fromUnixTime(reminder.startDate), 'HH:mm')
                    const subject = T.subject.reminder(reminder.studentFirstName, reminder.studentLastName)
                    const studentContent = T.content.studentReminder(time, reminder.teacherFirstName, reminder.teacherLastName)
                    const teacherContent = T.content.teacherReminder(time, reminder.studentFirstName, reminder.studentLastName)

                    this.mailService.sendMail([reminder.studentEmail], subject, { text: studentContent })
                    this.mailService.sendMail([reminder.teacherEmail], subject, { text: teacherContent })
                })
            )

            return true
        } catch {
            return false
        }
    }

    @MessagePattern({ cmd: NotificationMicroserviceCommand.SendCancellation })
    async sendCancellationAppointment(@Payload() dto: CancellationDto) {
        try {
            const { teacherFirstName, teacherLastName } = dto

            const time = format(fromUnixTime(dto.startDate), 'HH:mm')
            const subject = T.subject.cancelation
            const studentContent = T.content.cancelation(time, teacherFirstName, teacherLastName)
            const adminContent = T.content.cancelationAdmin(
                time,
                teacherFirstName,
                teacherLastName,
                dto.teacherEmail,
                dto.studentFirstName,
                dto.studentLastName,
                dto.teacherMessage
            )
            const { adminEmail } = getConfig().mailConfig

            this.mailService.sendMail([dto.studentEmail], subject, { text: studentContent })
            this.mailService.sendMail([adminEmail], subject, { text: adminContent })

            return true
        } catch {
            return false
        }
    }
}
