import { Module } from '@nestjs/common';
import { AuthAdminController } from './admin/auth.controller';
import { AdminAuthService } from './admin/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [JwtModule.register({global: true}), UsersModule, AdminModule],
  controllers: [AuthAdminController],
  providers: [AdminAuthService],
})
export class AuthModule {}
