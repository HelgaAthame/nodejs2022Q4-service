import { Controller } from '@nestjs/common';
import { TrackService } from './album.service';

@Controller('album')
export class TrackController {
  constructor(private readonly albumService: TrackService) {}
}
