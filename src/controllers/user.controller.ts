import {
  Body,
  Controller,
  Post,
  Put,
  Delete,
  Param,
  Get,
  Res,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { DeleteUserDto } from '../dto/delete-user.dto';
import { GetUserInfoByIdDto } from '../dto/get-userInfoById.dto';

import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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

  @Get('/')
  async getMyInfoById(@Res() res: Response) {
    // console.log(res.locals.user);
    // console.log(res.locals);
    // console.log(res);

    const id = res.locals.user;

    return await this.userService.getMyInfoById(id);
  }

  @Put('/update')
  async updateUser(@Body() data: UpdateUserDto) {
    await this.userService.updateUser(
      data.userId,
      data.password,
      data.name,
      data.email,
      data.userType
    );
  }

  @Delete('/delete')
  async deleteUser(@Body() data: DeleteUserDto) {
    await this.userService.deleteUser(data.id);
  }
}
