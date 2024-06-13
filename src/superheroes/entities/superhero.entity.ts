import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'superhero.superhero' })
export class superhero {
  @ApiProperty({
    description: 'Identificador único do Superherói',
  })
  @PrimaryColumn()
  id: number;

  @ApiProperty({
    description: 'Nome do Superherói',
  })
  @Column()
  superhero_name: string;

  @ApiProperty({
    description: 'Nome real do Superherói',
  })
  @Column()
  full_name: string;

  @ApiProperty({
    description: 'Genêro do Superherói',
  })
  @Column()
  gender_id: number;

  @ApiProperty({
    description: 'cor dos olhos do Superherói',
  })
  @Column()
  eye_colour_id: number;

  @ApiProperty({
    description: 'cor do cabelo do Superherói',
  })
  @Column()
  hair_colour_id: number;

  @ApiProperty({
    description: 'Cor da pele do Superherói',
  })
  @Column()
  skin_colour_id: number;

  @ApiProperty({
    description: 'Raça do Superherói',
  })
  @Column()
  race_id: number;

  @ApiProperty({
    description: 'Publicadora do Superherói',
  })
  @Column()
  publisher_id: number;

  @ApiProperty({
    description: 'Alinhamento moral-ético do Superherói',
  })
  @Column()
  alignment_id: number;

  @ApiProperty({
    description: 'Altura do Superherói',
  })
  @Column()
  height_cm: number;

  @ApiProperty({
    description: 'Peso do Superherói',
  })
  @Column()
  weight_kg: number;
}
