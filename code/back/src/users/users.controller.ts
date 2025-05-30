import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, SetMetadata } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Roles('Admin')
  @Get()
  findAll() {
    return this.usersService.findAll();
  }


  @Get(':correo')
  findEmail(@Param('correo') correo:string) {
    return this.usersService.findEmail(correo);
  }
  @Roles('Admin')
  @Get(':id')
  findOne(@Param('id') id:number) {
    return this.usersService.findOne(id);
  }

 @Roles('Admin')
 @Put(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

 @Roles('Admin')
 @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
