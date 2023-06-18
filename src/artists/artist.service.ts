import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DataBaseService } from "src/dataBase/dataBase.service";
import { CreateArtistDto } from "./dto/create-artist.dto";
import { v4 } from "uuid";
import { UpdateArtistDto } from "./dto/update-artist.dto";

@Injectable()
export class ArtistService {
  constructor(private dataBaseService: DataBaseService) {}

  getAllArtists() {
    return this.dataBaseService.getArtists();
  }

  getArtistById(id: string) {
    return this.dataBaseService.getArtist(id);
  }

  createArtist(createArtistDto: CreateArtistDto) {
    const newArtist = {
      id: v4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };

    this.dataBaseService.addArtist(newArtist);
    return newArtist;
  }

  updateArtist(updateArtistDto: UpdateArtistDto, id: string) {
    const artist = this.dataBaseService.getArtist(id);
    if (!artist) throw new HttpException(`Artist ${id} doesn't exist`, HttpStatus.NOT_FOUND);
    const updatedArtist = { ...artist, ...updateArtistDto };
    this.dataBaseService.updateArtist(updatedArtist, id);
    return updatedArtist;
  }

  deleteArtist(id: string) {
    this.dataBaseService.deleteArtist(id);
  }
}
