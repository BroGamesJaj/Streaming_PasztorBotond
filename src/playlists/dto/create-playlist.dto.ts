import { Song } from '@prisma/client';
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePlaylistDto {
    @IsString()
    @IsNotEmpty()
    nev: string;
}
