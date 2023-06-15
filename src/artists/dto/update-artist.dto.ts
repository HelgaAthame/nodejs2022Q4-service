import { PartialType } from "@nestjs/mapped-types/dist/partial-type.helper";
import { CreateArtistDto } from "./create-artist.dto";

export class UpdateArtistDto extends PartialType(CreateArtistDto) {}
