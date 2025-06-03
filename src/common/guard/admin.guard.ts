import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    const paramId = req.params.id;

    // Tokenni tekshiramiz
    if (
      !user ||
      !user.id ||
      (user.is_creator !== 'false' && user.is_creator !== 'true')
    ) {
      console.log('Xatolik:', user.role);
      throw new ForbiddenException({
        message: "Foydalanuvchi topilmadi yoki noto'g'ri formatda",
      });
    }

    // Faqat admin rolega ruxsat
    if (user.role !== 'admin') {
      throw new ForbiddenException({
        message: 'Siz admin emassiz',
      });
    }

    // // Oddiy admin (false) o‘zining ma’lumotini ko‘rishi mumkin
    // if (user.is_creator === 'false' && user.id !== +paramId) {
    //   throw new ForbiddenException({
    //     message: "Siz faqat o'z ma'lumotlaringizni ko'rishingiz mumkin",
    //   });
    // }

    return true;
  }
}
