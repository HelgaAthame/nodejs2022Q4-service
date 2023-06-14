import { Injectable } from "@nestjs/common";
import { DataBaseService } from "src/dataBase/dataBase.service";

@Injectable()
export class TrackService {
  constructor(private dataBaseService: DataBaseService) {}

  getAllTracks() {
    return this.dataBaseService.getTracks();
  }
}
