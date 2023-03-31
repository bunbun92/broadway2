import {
  Get,
  Injectable,
  NestMiddleware,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';
import { UserController } from 'src/renderers/user/render-user.controller';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private readonly userController: UserController
  ) {}
  //
  async use(req: Request, res: Response, next: NextFunction) {
    console.log('미들웨어실행');
    const authHeader = req.headers.authorization;

    const jwt = req.cookies.jwt;

    if (!jwt) {
      return res.render('toMain.ejs');
      // this.userController.getMain(res, req);
    }

    try {
      res.locals.user = await this.jwtService.verify(jwt);
      console.log(res.locals.user);
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        return res.render('toMain.ejs');
      }
    }

    console.log('여기 되나?');
    next();

    // console.log('req', req);
    // console.log('header', authHeader);

    // console.log('req.headers' + req.headers['x-jwt']);
    // console.log('req.rowHeaders' + req.rowHeaders);

    // if (!authHeader) {
    //   throw new UnauthorizedException('JWT not found');
    // }

    //   let token: string;
    //   try {
    //     token = authHeader.split(' ')[1];
    //     const payload = await this.jwtService.verify(token);
    //     req.user = payload;
    //     res.locals.user = payload;
    //     // res.json({ user: res.locals.user });
    //     // console.log('auth', res.locals.user);

    //     next();
    //   } catch (err) {
    //     throw new UnauthorizedException(`Invalid JWT: ${token}`);
    //   }
    // }
  }
}
