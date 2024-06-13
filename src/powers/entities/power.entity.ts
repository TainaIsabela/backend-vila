import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'superhero.hero_power' })
export class Power {
  @ApiProperty({
    description: 'Identificador do Superherói',
  })
  @PrimaryColumn({ nullable: false })
  hero_id: number;

  @ApiProperty({
    description: 'Identificador do poder',
  })
  @PrimaryColumn({ nullable: false })
  power_id: number;
}
