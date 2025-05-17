import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TuktuksService } from './tuktuks.service';
import { CreateTuktukDto } from './dto/create-tuktuk.dto';
import { UpdateTuktukDto } from './dto/update-tuktuk.dto';

@Controller('tuktuks')
export class TuktuksController {
  constructor(private readonly tuktuksService: TuktuksService) {}

  @Post()
  create(@Body() createTuktukDto: CreateTuktukDto) {
    return this.tuktuksService.create(createTuktukDto);
  }

  @Get()
  findAll() {
    return this.tuktuksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tuktuksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTuktukDto: UpdateTuktukDto) {
    return this.tuktuksService.update(+id, updateTuktukDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tuktuksService.remove(+id);
  }
}
