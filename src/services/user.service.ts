import {
  Res,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { _ } from 'lodash';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async login(
    userId: string,
    password: string
  ): Promise<{ accessToken: string } | undefined> {
    const user = await this.userRepository.findOne({
      where: { userId, deletedAt: null },
      select: ['id', 'password', 'userId', 'name', 'email', 'userType'],
    });

    if (_.isNil(user)) {
      throw new NotFoundException(`User not found. userId: ${userId}`);
    }

    const passwordTest = bcrypt.compare(password, user.password);

    if (!passwordTest) {
      throw new UnauthorizedException(
        `User password is not correct. userId: ${userId}`
      );
    }

    const payload = {
      id: user.id,
      userId: user.userId,
      name: user.name,
      email: user.email,
      userType: user.userType,
    };

    console.log(payload);
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async createUser(
    userId: string,
    hashed: string,
    name: string,
    email: string,
    userType: number
  ) {
    const existUser = await this.getUserInfo(userId);
    if (!_.isNil(existUser)) {
      throw new ConflictException(`User already exists. userId: ${userId}`);
    }

    const password = hashed;

    const insertResult = await this.userRepository.insert({
      userId,
      password,
      name,
      email,
      userType,
    });

    const payload = { id: insertResult.identifiers[0].id };
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }

  async getInfoById(id: number) {
    return await this.userRepository.findOne({
      where: { id, deletedAt: null },
    });
  }

  async getMyInfoById(id: number) {
    return await this.userRepository.findOne({
      where: { id, deletedAt: null },
    });
  }

  async updateUser(id: number, password: string, name: string, email: string) {
    await this.userRepository.update({ id }, { name, password, email });
  }

  async deleteUser(id: number) {
    await this.userRepository.softDelete(id);
  }

  async getUserInfo(userId: string) {
    return await this.userRepository.findOne({
      where: { userId, deletedAt: null },
      select: ['name'],
    });
  }

  async getUserName(name: string) {
    return await this.userRepository.findOne({
      where: { name, deletedAt: null },
      select: ['name'],
    });
  }

  async getUserIdById(userId: string) {
    return await this.userRepository.findOne({
      where: { userId, deletedAt: null },
    });
  }
}
