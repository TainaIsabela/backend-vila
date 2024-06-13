import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from '@nestjs/class-validator';

export class CreateAttributeDto {
  @ApiProperty({
    description: 'Identificador do Superherói',
    example: '232',
  })
  @IsNumber()
  @IsNotEmpty()
  hero_id: number;

  @ApiProperty({
    description: 'Identificador do Atributo',
    example: '4',
  })
  @IsNumber()
  @IsNotEmpty()
  attribute_id: number;

  @ApiProperty({
    description: 'Valor do Atributo',
    example: '15',
  })
  @IsNumber()
  @IsNotEmpty()
  attribute_value: number;
}
