import { IsArray, IsDateString, IsInt, IsOptional, IsString } from "class-validator";

export class CreateReservaDto {

    @IsDateString()
    fecha: Date;

    @IsString()
    hora: string;

    @IsInt()
    asistentes: number;

    @IsOptional()
    @IsString()
    observaciones?: string;

    @IsInt()
    clienteId: number;

    @IsOptional()
    @IsInt()
    guiaId?: number;

    @IsArray()
    rutasIds: number[];

    @IsOptional()
    @IsArray()
    tukTuksIds?: string[];
}
