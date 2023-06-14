import { Controller, Get } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get ()
  getAllFavorites() {
    return this.favoritesService.getAllFavorites();
  }
}
