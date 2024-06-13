import { Module } from '@nestjs/common';
import { BattleService } from './battle.service';
import { BattleController } from './battle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { superhero } from 'src/superheroes/entities/superhero.entity';
import { Power } from 'src/powers/entities/power.entity';
import { Attribute } from 'src/attributes/entities/attribute.entity';

@Module({
  imports: [TypeOrmModule.forFeature([superhero, Power, Attribute])],
  controllers: [BattleController],
  providers: [BattleService],
})
export class BattleModule {}
