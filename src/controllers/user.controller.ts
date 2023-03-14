import { Body, Controller, Post, Put, Delete, Param } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { DeleteUserDto } from '../dto/delete-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async login(@Body() data: LoginUserDto) {
    return await this.userService.login(data.userId, data.password);
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
