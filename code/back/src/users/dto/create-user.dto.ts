import { IsArray, IsInt, IsNotEmpty, IsString, Length } from "class-validator";
export class CreateUserDto {


  
    @IsString()
    nombre: string;
    
    @IsString()
    apellidos: string;
      
    @IsString()
    tlfno: string;
      
    @IsString()
    correo: string;
    
    @IsString()
    dni: string;
    
    @IsString()
    pais: string;
    
    @IsString()
    pass: string;
    @IsArray()
    roles: number[];
    
}
