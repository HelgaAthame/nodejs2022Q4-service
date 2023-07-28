import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/dataBase/dataBase.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { v4 } from 'uuid';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private dataBaseService: DataBaseService) {}

  getAllAlbums() {
    return this.dataBaseService.getAlbums();
  }

  getAlbumById(id: string) {
    return this.dataBaseService.getAlbum(id);
  }

  createAlbum(createAlbumDto: CreateAlbumDto) {
    const newAlbum = {
      id: v4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId,
    };

    this.dataBaseService.addAlbum(newAlbum);
    return newAlbum;
  }

  updateAlbum(updateAlbumDto: UpdateAlbumDto, id: string) {
    const album = this.dataBaseService.getAlbum(id);
    if (!album)
      throw new HttpException(
        `Album ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    const updatedAlbum = { ...album, ...updateAlbumDto };
    this.dataBaseService.updateAlbum(updatedAlbum, id);
    return updatedAlbum;
  }

  deleteAlbum(id: string) {
    this.dataBaseService.deleteAlbum(id);
  }
}
