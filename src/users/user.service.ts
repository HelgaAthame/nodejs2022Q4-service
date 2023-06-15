import { Injectable } from "@nestjs/common";
import { DataBaseService } from "src/dataBase/dataBase.service";

@Injectable()
export class UserService {
  constructor(private dataBaseService: DataBaseService) {}

  getAllUsers() {
    return this.dataBaseService.getUsers();
  }

  getUserById(id: string) {
    return this.dataBaseService.getUser(id);
  }
}
