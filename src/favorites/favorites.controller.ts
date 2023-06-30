import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getAllFavorites() {
    return this.favoritesService.getAllFavorites();
  }

  @Post('/track/:id')
  @HttpCode(HttpStatus.CREATED)
  addTrackToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!this.favoritesService.isItExist(id, 'tracks')) {
      throw new HttpException(
        `Track with ID=${id} doesn't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    this.favoritesService.addTrackToFavorites(id);
    return 'Track was added to favorites';
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrackFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favoritesService.deleteTrackFromFavorites(id);
    return 'Track was deleted from favorites';
  }

  @Post('/album/:id')
  @HttpCode(HttpStatus.CREATED)
  addAlbumToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!this.favoritesService.isItExist(id, 'albums')) {
      throw new HttpException(
        `Album with ID=${id} doesn't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    this.favoritesService.addAlbumToFavorites(id);
    return 'Album was added to favorites';
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbumFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favoritesService.deleteAlbumFromFavorites(id);
    return 'Album was deleted from favorites';
  }

  @Post('/artist/:id')
  @HttpCode(HttpStatus.CREATED)
  addArtistToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!this.favoritesService.isItExist(id, 'artists')) {
      throw new HttpException(
        `Artist with ID=${id} doesn't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    this.favoritesService.addArtistToFavorites(id);
    return 'Artist was added to favorites';
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtistFromFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favoritesService.deleteArtistFromFavorites(id);
    return 'Artist was deleted from favorites';
  }
}
