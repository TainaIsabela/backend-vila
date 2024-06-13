import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'superhero.hero_attribute' })
export class Attribute extends BaseEntity {
  @ApiProperty({
    description: 'Identificador do Superherói',
  })
  @PrimaryColumn({ nullable: false })
  hero_id: number;

  @ApiProperty({
    description: 'Identificador do Atributo',
  })
  @PrimaryColumn({ nullable: false })
  attribute_id: number;

  @ApiProperty({
    description: 'Valor do Atributo',
  })
  @PrimaryColumn({ nullable: false })
  attribute_value: number;
}
