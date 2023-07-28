import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { DataBaseModule } from 'src/dataBase/dataBase.module';

@Module({
  imports: [DataBaseModule],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
