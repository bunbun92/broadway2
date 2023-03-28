import {
  Body,
  Controller,
  Post,
  Put,
  Delete,
  Param,
  Get,
  Res,
  Req,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Response, Request } from 'express';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) {}

  @Post('/login')
  async login(@Body() data: LoginUserDto, @Res() res: Response): Promise<any> {
    const jwt = await this.userService.login(data.userId, data.password);
    res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);
    // res.set('Authorization', 'Bearer ' + jwt.accessToken);
    res.cookie('jwt', jwt.accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, //1 day
    });
    return res.send({
      message: 'success',
    });
  }

  @Post('/logout')
  async logout(@Res() res: Response) {
    res.cookie('jwt', '', {
      maxAge: 0,
    });
    return res.send({
      message: 'success',
    });
  }

  @Post('/signup')
  async createUser(
    @Body() data: CreateUserDto,
    @Res() res: Response,
    @Req() req: Request
  ) {
    // 아이디: 영어대소문자숫자
    const idCheck = /^[A-Za-z0-9]{3,}$/;
    // 비밀번호: 영어대소문자숫자
    const passwordCheck = /^[A-Za-z0-9]{3,}$/;
    // 닉네임:한글포함영어대소문자숫자
    const nicknameCheck = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
    // 이메일: aaa@aaa.aaa
    const emailCheck = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (
      !idCheck.test(data.userId) ||
      !passwordCheck.test(data.password) ||
      !nicknameCheck.test(data.name) ||
      !emailCheck.test(data.email)
    ) {
      return res.status(412).json({
        errorMessage: '형식이 올바르지 않습니다. 다시 확인해주세요.',
      });
    }

    const foundById = await this.userService.getUserIdById(data.userId);

    if (foundById !== null) {
      return res
        .status(409)
        .json({ errorMessage: `${data.userId}는 이미 존재하는 아이디입니다.` });
    }

    const foundByname = await this.userService.getUserName(data.name);

    if (foundByname !== null) {
      return res
        .status(409)
        .json({ errorMessage: `${data.name}는 이미 존재하는 닉네임입니다.` });
    }

    const hashed = await bcrypt.hash(data.password, 12);

    await this.userService.createUser(
      data.userId,
      hashed,
      data.name,
      data.email,
      data.userType
    );
    return res.status(201).json('성공!');
  }

  @Get('/get/:userId')
  async getInfoById(@Param('userId') userId: number) {
    return await this.userService.getInfoById(userId);
  }

  @Get('/')
  async getMyInfoById(@Req() req: Request) {
    const jwt = req.cookies.jwt;
    const userId = this.jwtService.verify(jwt)['id'];

    return await this.userService.getMyInfoById(userId);
  }

  @Put('/update')
  async updateUser(@Body() data: UpdateUserDto, @Req() req: Request) {
    const jwt = req.cookies.jwt;
    const userId = this.jwtService.verify(jwt)['id'];
    await this.userService.updateUser(
      userId,
      data.password,
      data.name,
      data.email
    );
  }

  @Delete('/delete')
  async deleteUser(@Req() req: Request) {
    const jwt = req.cookies.jwt;
    const userId = this.jwtService.verify(jwt)['id'];
    await this.userService.deleteUser(userId);
  }
}
