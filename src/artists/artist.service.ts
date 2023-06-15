import { Injectable } from "@nestjs/common";
import { DataBaseService } from "src/dataBase/dataBase.service";

@Injectable()
export class ArtistService {
  constructor(private dataBaseService: DataBaseService) {}

  getAllArtists() {
    return this.dataBaseService.getArtists();
  }

  getArtistById(id: string) {
    return this.dataBaseService.getArtist(id);
  }
}
