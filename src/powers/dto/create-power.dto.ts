import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from '@nestjs/class-validator';

export class CreatePowerDto {
  @ApiProperty({
    description: 'Identificador do poder',
    example: 'Consciência Dimensional',
  })
  @IsNumber()
  @IsNotEmpty()
  power_id: number;

  @ApiProperty({
    description: 'Identificador do Superherói',
    example: '232',
  })
  @IsNumber()
  @IsNotEmpty()
  hero_id: number;
}
