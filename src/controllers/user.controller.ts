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
  async createUser(@Body() data: CreateUserDto) {
    return await this.userService.createUser(
      data.userId,
      data.password,
      data.name,
      data.email,
      data.userType
    );
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
