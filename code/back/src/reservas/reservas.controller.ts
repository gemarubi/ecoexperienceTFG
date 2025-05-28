import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { Roles } from 'src/users/users.controller';
 
@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) { }

  
  @Post()
 @UseGuards(JwtAuthGuard)
  create(@Body() createReservaDto: CreateReservaDto, @Req() req: Request) {
    console.log(createReservaDto)
      const clienteId = (req as any).user
      console.log(clienteId.user.id)
  if (!clienteId) {
    throw new UnauthorizedException('Cliente no identificado');
  }
   
    return this.reservasService.create(createReservaDto,clienteId.user.id);
  }
 

  @Get('nodisponibles/:tipo')
  getFechasNoDisponibles(@Param('tipo') tipo: string) {
    
    return this.reservasService.getFechasNoDisponibles(tipo);
  }

  
  @Get()
  //@UseGuards(JwtAuthGuard)
  //@Roles('Admin')
  getAll(@Param('tipo') tipo: string) {
    
    return this.reservasService.getAllReservas();
  }

 
}
