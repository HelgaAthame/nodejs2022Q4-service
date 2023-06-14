import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { TrackModule } from './tracks/track.module';
import { AlbumModule } from './albums/album.module';
import { ArtistModule } from './artists/artist.module';

@Module({
  imports: [
    UserModule,
    TrackModule,
    AlbumModule,
    ArtistModule,
    Da
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
