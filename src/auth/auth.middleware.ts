import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: any, res: any, next: Function) {
    console.log('미들웨어실행');
    const authHeader = req.headers.authorization;
    // console.log('req', req);
    // console.log('header', authHeader);

    console.log('req.headers' + req.headers['x-jwt']);
    // console.log('req.rowHeaders' + req.rowHeaders);

    if (!authHeader) {
      throw new UnauthorizedException('JWT not found');
    }

    let token: string;
    try {
      token = authHeader.split(' ')[1];
      const payload = await this.jwtService.verify(token);
      req.user = payload;
      res.locals.user = payload;
      // res.json({ user: res.locals.user });
      // console.log('auth', res.locals.user);

      next();
    } catch (err) {
      throw new UnauthorizedException(`Invalid JWT: ${token}`);
    }
  }
}
