import { Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get ()
  getAllFavorites() {
    return this.favoritesService.getAllFavorites();
  }

  @Post ('/track/:id')
  addTrackToFavorites(@Param('id', new ParseUUIDPipe()) id: string) {
    //const track = this.favoritesService.addTrackToFavorites();

  }
}
