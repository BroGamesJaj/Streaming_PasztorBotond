import { IsDefined, IsInt, IsNotEmpty, IsPositive, IsString, Max, Min } from "class-validator";

export class CreateSongDto {
    @IsNotEmpty()
    @IsString()
    cim: string;
    @IsNotEmpty()
    @IsString()
    szerzo: string;
    @IsInt()
    @IsNotEmpty()
    @IsDefined()
    @IsPositive()
    hossz: number;
    @IsInt()
    @Min(0)
    ar: number;
    @IsInt()
    @Min(1)
    @Max(5)
    ertekeles: number;

}
