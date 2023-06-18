import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { validate } from 'uuid';
import { Track } from './interfaces/track.interface';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get ()
  getAllTracks(): Track[] {
    return this.trackService.getAllTracks();
  }

  @Get(':id' )
  getTrackById(@Param('id', new ParseUUIDPipe()) id: string): Track {
    const track = this.trackService.getTrackById(id);
    if (!track) {
      throw new HttpException(
        `Track ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    return track;
  }

  @Post()
  createTrack (@Body() createTrackDto: CreateTrackDto): Track {
    if (!createTrackDto.hasOwnProperty('name')
      || !createTrackDto.hasOwnProperty('duration')
      || !createTrackDto.hasOwnProperty('albumId')
      || !createTrackDto.hasOwnProperty('artistId')
    ) {
      throw new HttpException(
        'Request body does not contain required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.trackService.createTrack(createTrackDto);
  }

  @Put(':id')
  updateTrack (
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Track {
    if (
      !updateTrackDto.hasOwnProperty('name')
      || !updateTrackDto.hasOwnProperty('duration')
      || !updateTrackDto.hasOwnProperty('albumId')
      || !updateTrackDto.hasOwnProperty('artistId')
      || typeof updateTrackDto.duration !== 'number'
      || typeof updateTrackDto.albumId === 'number'
      || typeof updateTrackDto.artistId === 'number'
    ) {
      throw new HttpException(
        'Request body does not contain required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    const track = this.trackService.updateTrack(updateTrackDto, id);
    return track;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack (@Param('id', new ParseUUIDPipe()) id: string) {
    const track = this.trackService.getTrackById(id);
    if (!track) {
      throw new HttpException(
        `Track ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    this.trackService.deleteTrack(id);
    return;
  }
}
