import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DataBaseService } from "src/dataBase/dataBase.service";
import { CreateUserDto } from "./dto/creat-user.dto";
import { User } from "./interfaces/user.interface";
import { v4 } from "uuid";
import { UpdatePasswordDto } from "./dto/update-password.dto";

@Injectable()
export class UserService {
  constructor(private dataBaseService: DataBaseService) {}

  getAllUsers() {
    return this.dataBaseService.getUsers();
  }

  getUserById(id: string) {
    return this.dataBaseService.getUser(id);
  }

  createUser(createUserDto: CreateUserDto) {
    const newUser: User = {
      id: v4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    this.dataBaseService.addUser(newUser);
    return newUser;
  }

  updatePassword(updatePasswordDto: UpdatePasswordDto, id: string) {
    if (! updatePasswordDto.newPassword || ! updatePasswordDto.oldPassword) {
      throw new HttpException(
        'There is no password in your req',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = this.dataBaseService.getUser(id);

    if (!user) {
      throw new HttpException( `User ${id} doesn't exist`, HttpStatus.NOT_FOUND);
    }

    if (updatePasswordDto.oldPassword !== user.password) {
      throw new HttpException('Password does not match', HttpStatus.FORBIDDEN);
    }

    const updatedUser: User = {
      ...user,
      password: updatePasswordDto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };

    this.dataBaseService.updateUser(updatedUser, id);

    return updatedUser;
  }

  deleteUser(id: string) {
    this.dataBaseService.deleteUser(id);
  }
}
