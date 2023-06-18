import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

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

  @Post()
  createAlbum (@Body() createAlbumDto: CreateAlbumDto) {
    if (!createAlbumDto.name
      || !createAlbumDto.year
      || !createAlbumDto.artistId
    ) {
      throw new HttpException(
        'Request body does not contain required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.albumService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  updateAlbum (
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    if (typeof updateAlbumDto.name !== 'string'
      || typeof updateAlbumDto.year !== 'number'
      || typeof updateAlbumDto.artistId !== 'string'
    ) {
      throw new HttpException(
        'Request body does not contain required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    const album = this.albumService.updateAlbum(updateAlbumDto, id);
    return album;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum (@Param('id', new ParseUUIDPipe()) id: string) {
    const album = this.albumService.getAlbumById(id);
    if (!album) {
      throw new HttpException(
        `Album ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    this.albumService.deleteAlbum(id);
    return;
  }
}
