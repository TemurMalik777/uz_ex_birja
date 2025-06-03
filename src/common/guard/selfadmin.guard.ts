import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SelfAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user; // 🛠️ E'tibor bering: user dan olinadi
    const paramId = +req.params.id;

    if (!user) {
      throw new ForbiddenException('Foydalanuvchi topilmadi');
    }

    if (user.role !== 'admin') {
      throw new ForbiddenException('Siz admin emassiz');
    }

    const isCreator = user.is_creator === true || user.is_creator === 'true';

    if (!isCreator && user.id !== paramId) {
      throw new ForbiddenException(
        "Siz faqat o'z ma'lumotlaringizni ko'rishingiz mumkin",
      );
    }

    return true;
  }
}
