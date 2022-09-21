import { InjectRepository } from '@nestjs/typeorm';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { Repository } from 'typeorm';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
} as SMTPTransport.Options)


export class MailService {
    async sendRecoveryEmail(to: string, link: string) {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Активация аккаунта' + process.env.API_URL,
            text: '',
            html:
                `
            <div>
                <h1>Для активации перейдите по ссылке</h1>
                <a href="${link}">${link}</a>
            </div>
            `
        })

    }
}