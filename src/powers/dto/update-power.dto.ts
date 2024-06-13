import { PartialType } from '@nestjs/mapped-types';
import { CreatePowerDto } from './create-power.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from '@nestjs/class-validator';

export class UpdatePowerDto extends PartialType(CreatePowerDto) {
  @ApiProperty({
    description: 'Identificador do id do poder antigo',
    example: '12',
  })
  @IsNumber()
  power_old_id: number;
}
