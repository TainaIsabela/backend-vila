import { Module } from '@nestjs/common';
import { PowersService } from './powers.service';
import { PowersController } from './powers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Power } from './entities/power.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Power])],
  controllers: [PowersController],
  providers: [PowersService],
})
export class PowersModule {}
