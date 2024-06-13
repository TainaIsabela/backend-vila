import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { superhero } from 'src/superheroes/entities/superhero.entity';
import { Power } from 'src/powers/entities/power.entity';
import { Attribute } from 'src/attributes/entities/attribute.entity';

@Module({
  imports: [TypeOrmModule.forFeature([superhero, Power, Attribute])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
