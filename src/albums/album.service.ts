import { Injectable } from "@nestjs/common";
import { DataBaseService } from "src/dataBase/dataBase.service";

@Injectable()
export class AlbumService {
  constructor(private dataBaseService: DataBaseService) {}

  getAllAlbums() {
    return this.dataBaseService.getAlbums();
  }
}
