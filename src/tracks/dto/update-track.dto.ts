import { PartialType } from "@nestjs/mapped-types/dist/partial-type.helper";
import { CreateTrackDto } from "./create-track.dto";

export class UpdateTrackDto extends PartialType(CreateTrackDto) {}
