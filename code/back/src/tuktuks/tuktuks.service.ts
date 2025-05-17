import { Injectable } from '@nestjs/common';
import { CreateTuktukDto } from './dto/create-tuktuk.dto';
import { UpdateTuktukDto } from './dto/update-tuktuk.dto';

@Injectable()
export class TuktuksService {
  create(createTuktukDto: CreateTuktukDto) {
    return 'This action adds a new tuktuk';
  }

  findAll() {
    return `This action returns all tuktuks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tuktuk`;
  }

  update(id: number, updateTuktukDto: UpdateTuktukDto) {
    return `This action updates a #${id} tuktuk`;
  }

  remove(id: number) {
    return `This action removes a #${id} tuktuk`;
  }
}
