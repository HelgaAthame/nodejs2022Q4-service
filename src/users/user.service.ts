import { Injectable } from "@nestjs/common";
import { DataBaseService } from "src/dataBase/dataBase.service";
import { CreateUserDto } from "./dto/creat-user.dto";
import { User } from "./interfaces/user.interface";
import { v4 } from "uuid";

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
}
