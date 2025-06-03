import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Admin } from '../admin/entities/admin.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  // async sendStaffMail(staff: Staff) {
  //   const url = `${process.env.API_HOST}/api/staff/activate/${staff.active_link}`;

  //   await this.mailerService.sendMail({
  //     to: staff.email,
  //     subject: 'Welcome to Shifoxona App!',
  //     template: './confirmation',
  //     context: {
  //       name: staff.username,
  //       url,
  //     },
  //   });
  // }

  async sendUserMail(user: User) {
    const url = `${process.env.API_HOST}/api/users/activate/${user.active_link}`;
    console.log('ACTIVE LINK:', user.active_link);

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to UZEX Birja App!',
      template: './confirmation',
      context: {
        name: user.full_name,
        url,
      },
    });
  }

   async sendAdminMail(admin: Admin) {
    const url = `${process.env.API_HOST}/api/admin/activate/${admin.active_link}`;

    await this.mailerService.sendMail({
      to: admin.email,
      subject: "Welcome to Uzex birja!",
      template: "./confirmation",
      context: {
        name: admin.fullName,
        url,
      },
    });
  }
}
