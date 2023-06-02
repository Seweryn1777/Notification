export const en_US = {
    subject: {
        confirmationEmail: 'Confirm your email',
        reminder: (firstName: string, lastName: string) => `Hello ${firstName} ${lastName}`,
        cancelation: 'Attention! The meeting has been canceled'
    },
    content: {
        studentReminder: (time: string, teacherFirstName: string, teacherLastName: string) =>
            `We remind you of the appointment that will be held today at ${time} with teacher ${teacherFirstName} ${teacherLastName}.`,
        teacherReminder: (time: string, studentFirstName: string, studentLastName: string) =>
            `We remind you of the appointment that will be held today at ${time} with student ${studentFirstName} ${studentLastName}.`,
        cancelation: (time: string, teacherFirstName: string, teacherLastName: string) =>
            `Teacher ${teacherFirstName} ${teacherLastName} has unfortunately canceled the meeting at time ${time} for unexpected reasons. The lesson will be refunded to your account.`,
        cancelationAdmin: (
            time: string,
            teacherFirstName: string,
            teacherLastName: string,
            teacherEmail: string,
            studentFirstName: string,
            studentLastName: string,
            message: string
        ) =>
            `Teacher ${teacherFirstName} ${teacherLastName} with email ${teacherEmail} has canceled the meeting at time ${time} with ${studentFirstName} ${studentLastName}. Teacher's reason: ${message}`
    }
}
