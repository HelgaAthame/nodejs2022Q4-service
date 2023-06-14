import { PartialType } from "@nestjs/mapped-types/dist/partial-type.helper";
import { CreateAlbumDto } from "./create-album.dto";

export class UpdateAlbumDTO extends PartialType(CreateAlbumDto) {}
