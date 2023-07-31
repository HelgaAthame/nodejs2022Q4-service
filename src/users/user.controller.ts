import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/creat-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from 'prisma/prisma-client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id', new ParseUUIDPipe()) id: string): Promise<User> {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new HttpException(`User ${id} doesn't exist`, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    if (
      !createUserDto.hasOwnProperty('login') ||
      !createUserDto.hasOwnProperty('password') ||
      typeof createUserDto.login !== 'string' ||
      typeof createUserDto.password !== 'string'
    ) {
      throw new HttpException(
        'Request body does not contain required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  updatePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.userService.updatePassword(updatePasswordDto, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = this.userService.getUserById(id);
    if (!user) {
      throw new HttpException(`User ${id} doesn't exist`, HttpStatus.NOT_FOUND);
    }
    this.userService.deleteUser(id);
    return;
  }
}
