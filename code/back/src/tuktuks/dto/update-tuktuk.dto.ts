import { PartialType } from '@nestjs/mapped-types';
import { CreateTuktukDto } from './create-tuktuk.dto';

export class UpdateTuktukDto extends PartialType(CreateTuktukDto) {}
