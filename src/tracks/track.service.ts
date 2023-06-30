import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/dataBase/dataBase.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { v4 } from 'uuid';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(private dataBaseService: DataBaseService) {}

  getAllTracks() {
    return this.dataBaseService.getTracks();
  }

  getTrackById(id: string) {
    return this.dataBaseService.getTrack(id);
  }

  createTrack(createTrackDto: CreateTrackDto) {
    const newTrack = {
      id: v4(),
      name: createTrackDto.name,
      duration: createTrackDto.duration,
      artistId: createTrackDto.artistId,
      albumId: createTrackDto.albumId,
    };

    this.dataBaseService.addTrack(newTrack);
    return newTrack;
  }

  updateTrack(updateTrackDto: UpdateTrackDto, id: string) {
    const track = this.dataBaseService.getTrack(id);
    if (!track)
      throw new HttpException(
        `Track ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    const updatedTrack = { ...track, ...updateTrackDto };
    this.dataBaseService.updateTrack(updatedTrack, id);
    return updatedTrack;
  }

  deleteTrack(id: string) {
    this.dataBaseService.deleteTrack(id);
  }
}
