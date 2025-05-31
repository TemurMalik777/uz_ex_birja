import { Module } from '@nestjs/common';
import { AuthAdminController } from './admin/auth.controller';
import { AdminAuthService } from './admin/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AdminModule } from '../admin/admin.module';
import { UsersService } from '../users/users.service';
import { MailModule } from '../mail/mail.module';
import { AuthUserController } from './user/user.controller';
import { AuthUserService } from './user/user.service';

@Module({
  imports: [JwtModule.register({ global: true }), UsersModule, AdminModule],
  controllers: [AuthAdminController, AuthUserController],
  providers: [AdminAuthService, AuthUserService],
})
export class AuthModule {}
