import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interfaces/album.interface';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAllAlbums(): Album[] {
    return this.albumService.getAllAlbums();
  }

  @Get(':id')
  getAlbumById(@Param('id', new ParseUUIDPipe()) id: string): Album {
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
  createAlbum(@Body() createAlbumDto: CreateAlbumDto): Album {
    if (
      !createAlbumDto.hasOwnProperty('name') ||
      !createAlbumDto.hasOwnProperty('year') ||
      !createAlbumDto.hasOwnProperty('artistId')
    ) {
      throw new HttpException(
        'Request body does not contain required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.albumService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  updateAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    if (
      !updateAlbumDto.hasOwnProperty('name') ||
      !updateAlbumDto.hasOwnProperty('year') ||
      !updateAlbumDto.hasOwnProperty('artistId') ||
      typeof updateAlbumDto.name === 'boolean' ||
      typeof updateAlbumDto.year === 'string' ||
      typeof updateAlbumDto.artistId === 'number'
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
  deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
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
