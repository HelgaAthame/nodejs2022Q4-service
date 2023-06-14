import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { DataBaseModule } from 'src/dataBase/dataBase.module';

@Module({
  imports: [DataBaseModule],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
