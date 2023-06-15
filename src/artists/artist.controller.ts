import { Controller, Get, HttpException, HttpStatus, Param, ParseUUIDPipe } from '@nestjs/common';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get ()
  getAllArtists() {
    return this.artistService.getAllArtists();
  }

  @Get(':id' )
  getArtistById(@Param('uuid', new ParseUUIDPipe()) id: string) {
    const artist = this.artistService.getArtistById(id);
    if (!artist) {
      throw new HttpException(
        `Artist ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    return artist;
  }
}
