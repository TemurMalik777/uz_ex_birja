import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SupperAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user || typeof user.is_creator !== 'string') {
      throw new ForbiddenException({
        message: "Foydalanuvchi topilmadi yoki is_creator noto'g'ri formatda",
      });
    }

    if (user.is_creator !== 'true') {
      throw new ForbiddenException({
        message: 'Siz gʻaraz niyatli adminmisiz? Kirishga ruxsat yo‘q!',
      });
    }

    return true;
  }
}
