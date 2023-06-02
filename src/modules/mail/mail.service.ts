import { Injectable } from '@nestjs/common'
import { SES } from 'aws-sdk'
import { getConfig } from 'lib/config'
import { EmailContent } from './types'

@Injectable()
export class MailService {
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
}
