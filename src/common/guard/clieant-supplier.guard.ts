import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class UserAccessGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    const paramId = Number(req.params.id);

    if (!user) {
      throw new ForbiddenException('Foydalanuvchi topilmadi');
    }

    // 🔒 is_active false bo'lsa to'siladi
    if (user.is_active !== 'true') {
      throw new ForbiddenException('Profilingiz faolsiz, kirish taqiqlangan');
    }

    // admin barchasini ko'rishi mumkin
    if (user.role === 'admin') {
      return true;
    }

    // user bo'lsa va client yoki supplier bo'lsa, faqat o'z id si bilan kirishi mumkin
    if (
      user.role === 'user' &&
      (user.type === 'client' || user.type === 'supplier')
    ) {
      if (user.id === paramId) {
        return true;
      } else {
        throw new ForbiddenException(
          "Faqat o'zingizning ma'lumotlaringizni ko'rishingiz mumkin",
        );
      }
    }

    // qolgan hamma holatda taqiqlanadi
    throw new ForbiddenException('Kirishga ruxsat yo‘q');
  }
}
