import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { DataBaseModule } from 'src/dataBase/dataBase.module';

@Module({
  imports: [DataBaseModule],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
