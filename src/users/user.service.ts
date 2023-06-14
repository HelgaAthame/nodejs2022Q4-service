import { Injectable } from "@nestjs/common";
import { DataBaseService } from "src/dataBase/dataBase.service";

@Injectable()
export class UserService {
  constructor(private dataBaseService: DataBaseService) {}

  getAllUsers() {
    this.dataBaseService.getUsers();
  }
}
