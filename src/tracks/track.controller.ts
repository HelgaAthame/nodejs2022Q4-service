import { Controller, Get, HttpException, HttpStatus, Param, ParseUUIDPipe } from '@nestjs/common';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get ()
  getAllTracks() {
    return this.trackService.getAllTracks();
  }

  @Get(':id' )
  getTrackById(@Param('uuid', new ParseUUIDPipe()) id: string) {
    const track = this.trackService.getTrackById(id);
    if (!track) {
      throw new HttpException(
        `Track ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    return track;
  }
}
