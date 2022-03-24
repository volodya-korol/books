import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { getTemplate } from 'src/common/templates/templates';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  sendConfirmationCode(to: string, code: number | string) {
    const html = getTemplate({ name: 'confirmationCode', config: { code: code.toString() } });
    this.mailerService.sendMail({
      to: to,
      subject: 'Confirm your account ✔',
      html: html,
    });
  }

  sendForgotPasswordCode(to: string, code: number | string) {
    const html = getTemplate({ name: 'forgotPassword', config: { code: code.toString() } });
    this.mailerService.sendMail({
      to: to,
      subject: 'Password code ✔',
      html: html,
    });
  }
}
