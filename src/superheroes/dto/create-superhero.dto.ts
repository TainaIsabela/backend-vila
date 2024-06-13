import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from '@nestjs/class-validator';

export class CreateSuperheroDto {
  @ApiProperty({
    description: 'Identificador do Superherói',
    example: '232',
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Nome do Superherói',
    example: 'Doctor Strange',
  })
  @IsString()
  superhero_name: string;

  @ApiProperty({
    description: 'Nome real do Superherói',
    example: 'Stephen Vincent Strange',
  })
  @IsString()
  full_name: string;

  @ApiProperty({
    description: 'Genêro do Superherói',
    example: '1',
  })
  @IsNumber()
  gender_id: number;

  @ApiProperty({
    description: 'Cor dos olhos do Superherói',
    example: '13',
  })
  @IsNumber()
  eye_colour_id: number;

  @ApiProperty({
    description: 'Cor do cabelo do Superherói',
    example: '4',
  })
  @IsNumber()
  hair_colour_id: number;

  @ApiProperty({
    description: 'Cor da pele do Superherói',
    example: '1',
  })
  @IsNumber()
  skin_colour_id: number;

  @ApiProperty({
    description: 'Raça do Superherói',
    example: '24',
  })
  @IsNumber()
  race_id: number;

  @ApiProperty({
    description: 'Publicadora do Superherói',
    example: '13',
  })
  @IsNumber()
  publisher_id: number;

  @ApiProperty({
    description: 'Alinhamento moral-ético do Superherói',
    example: '1',
  })
  @IsNumber()
  alignment_id: number;

  @ApiProperty({
    description: 'Altura do Superherói',
    example: '188',
  })
  @IsNumber()
  height_cm: number;

  @ApiProperty({
    description: 'Peso do Superherói',
    example: '81',
  })
  @IsNumber()
  weight_kg: number;
}
