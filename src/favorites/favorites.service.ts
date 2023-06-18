import { Injectable } from "@nestjs/common";
import { DataBaseService } from "src/dataBase/dataBase.service";

@Injectable()
export class FavoritesService {
  constructor(private dataBaseService: DataBaseService) {}

  getAllFavorites() {
    return this.dataBaseService.getFavorites();
  }

  addTrackToFavorites(id: string) {
    this.dataBaseService.addFavorite(id, 'tracks');
  }

  deleteTrackFromFavorites(id: string) {
    this.dataBaseService.deleteFavorite(id, 'tracks');
  }

  addAlbumToFavorites(id: string) {
    this.dataBaseService.addFavorite(id, 'albums');
  }

  deleteAlbumFromFavorites(id: string) {
    this.dataBaseService.deleteFavorite(id, 'albums');
  }

  addArtistToFavorites(id: string) {
    this.dataBaseService.addFavorite(id, 'artists');
  }

  deleteArtistFromFavorites(id: string) {
    this.dataBaseService.deleteFavorite(id, 'artists');
  }

  isItExist(id: string, what: string) {
    return this.dataBaseService.isIt(id, what);
  }
}
