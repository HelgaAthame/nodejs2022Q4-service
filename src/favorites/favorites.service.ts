import { Injectable } from "@nestjs/common";
import { DataBaseService } from "src/dataBase/dataBase.service";

@Injectable()
export class FavoritesService {
  constructor(private dataBaseService: DataBaseService) {}

  getAllFavorites() {
    return this.dataBaseService.getFavorites();
  }
}
