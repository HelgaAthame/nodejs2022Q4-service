import { Controller, Get, HttpException, HttpStatus, Param, ParseUUIDPipe } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get ()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get (':id')
  getUserById (@Param('uuid', new ParseUUIDPipe()) id: string) {
    const user = this.userService.getUserById(id);
    if (!user) {
      throw new HttpException(
        `User ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }


}
