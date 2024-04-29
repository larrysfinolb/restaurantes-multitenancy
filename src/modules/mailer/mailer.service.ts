import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { join } from 'node:path';
import { readFileSync } from 'fs';
import { Transporter, createTransport } from 'nodemailer';
import Handlebars from 'handlebars';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { ITemplates } from './interfaces/templates.interface';
import { IWelcomeTemplateData } from './interfaces/templates-data.interface';

@Injectable()
export class MailerService {
  private readonly transport: Transporter<SMTPTransport.SentMessageInfo>;
  private readonly email: string;
  private readonly templates: ITemplates;

  constructor(private readonly configService: ConfigService) {
    const emailConfig = this.configService.get('email');

    this.transport = createTransport(emailConfig);
    this.email = `"Restaurants" <${emailConfig.auth.user}>`;
    this.templates = {
      welcome: this.parseTemplate('welcome.hbs'),
    };
  }

  private parseTemplate(templateName: string) {
    const templateText = readFileSync(
      join(__dirname, 'templates', templateName),
      'utf8',
    );

    return Handlebars.compile<IWelcomeTemplateData>(templateText, {
      strict: true,
    });
  }

  sendWelcomeEmail({
    email,
    name,
    restaurant,
    subdomain,
  }: {
    email: string;
    name: string;
    restaurant: string;
    subdomain: string;
  }) {
    const html = this.templates.welcome({
      name,
      restaurant,
      link: `https://`,
      subdomain,
    });

    this.sendEmail({
      to: email,
      subject: 'Welcome to Restaurants!',
      html,
    });
  }

  sendEmail({
    to,
    subject,
    html,
  }: {
    to: string;
    subject: string;
    html: string;
  }) {
    this.transport
      .sendMail({
        from: this.email,
        to,
        subject,
        html,
      })
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error('Error sending email', error);
      });
  }
}
