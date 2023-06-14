import { PartialType } from "@nestjs/mapped-types/dist/partial-type.helper";
import { CreateTrackDto } from "./create-track.dto";

export class UpdateTrackDTO extends PartialType(CreateTrackDto) {}
