import { Module } from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { SuperheroesController } from './superheroes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { superhero } from './entities/superhero.entity';
@Module({
  imports: [TypeOrmModule.forFeature([superhero])],
  controllers: [SuperheroesController],
  providers: [SuperheroesService],
})
export class SuperheroesModule {}
