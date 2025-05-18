import { IsArray, IsDecimal, IsInt, IsNumber, IsString } from "class-validator";

export class SugerenciaRutaDto {
     @IsString()
      tipo: string;
    
      @IsNumber()
      precioMax: number;
    
      @IsInt()
      duracionMin: number; 

      @IsInt()
      duracionMax: number; 

      @IsArray()
      preferencias:Array<string>;

}
