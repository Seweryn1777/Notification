## Notification microservice
    Notification microservice is a component in a language platform application based on microservices architecture
    and the NestJS framework. Its main task is to handle the sending of notifications using AWS SES (Amazon Simple Email Service).

    Sending emails using AWS SES: Notification microservice integrates with the AWS SES service, which allows you to send emails
    in a reliable and scalable way. The microservice uses the AWS SES API to send email notifications to application users,
    such as registration confirmations or meeting reminders.

## Code example

Sending a reminder:

```javascript
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
```

Sending an email:

```javascript
    sendMail(to: Array<string>, subject: string, content: EmailContent) {
        if (!content.text && !content.html) {
            return Promise.resolve()
        }

        const { region, accessKeyId, secretAccessKey } = getConfig().sesConfig
        const ses = new SES({
            region,
            accessKeyId,
            secretAccessKey
        })
        const { from } = getConfig().mailConfig
        const body = content.html
            ? {
                  Html: {
                      Data: content.html as string,
                      Charset: 'UTF-8'
                  }
              }
            : {
                  Text: {
                      Data: content.text as string,
                      Charset: 'UTF-8'
                  }
              }

        return ses
            .sendEmail({
                Source: from,
                Destination: {
                    ToAddresses: to
                },
                Message: {
                    Subject: {
                        Data: subject
                    },
                    Body: body
                }
            })
            .promise()
    }
```
