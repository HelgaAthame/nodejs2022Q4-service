import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/creat-user.dto';
import { v4 } from 'uuid';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'prisma/prisma-client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getAllUsers() {
    return this.prisma.user.findMany();
  }

  getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });;
  }

  createUser(createUserDto: CreateUserDto) {
    const newUser = this.prisma.user.create({
      data: {
        login: createUserDto.login,
        password:createUserDto.password,
        version: 1,
      },
    });
    return newUser;
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto, id: string) {
    if (!updatePasswordDto.newPassword || !updatePasswordDto.oldPassword) {
      throw new HttpException(
        'There is no password in your req',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new HttpException(`User ${id} doesn't exist`, HttpStatus.NOT_FOUND);
    }

    if (updatePasswordDto.oldPassword !== user.password) {
      throw new HttpException('Password does not match', HttpStatus.FORBIDDEN);
    }

    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password: updatePasswordDto.newPassword,
        version: user.version + 1,
      },
    });
    return updatedUser;
  }

  async deleteUser(id: string) {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
