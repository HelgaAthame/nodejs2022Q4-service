import { Controller, Get, HttpException, HttpStatus, Param, ParseUUIDPipe } from '@nestjs/common';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAllAlbums() {
    return this.albumService.getAllAlbums();
  }

  @Get(':id' )
  getAlbumById(@Param('uuid', new ParseUUIDPipe()) id: string) {
    const album = this.albumService.getAlbumById(id);
    if (!album) {
      throw new HttpException(
        `Album ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    return album;
  }
}
