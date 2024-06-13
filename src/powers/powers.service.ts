import { Injectable } from '@nestjs/common';
import { CreatePowerDto } from './dto/create-power.dto';
import { UpdatePowerDto } from './dto/update-power.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Power } from './entities/power.entity';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class PowersService {
  constructor(
    @InjectRepository(Power)
    private readonly powerRepository: Repository<Power>,
  ) {}

  async create(createPowerDto: CreatePowerDto): Promise<CreatePowerDto> {
    const powerExists = await this.powerRepository.findOne({
      where: {
        hero_id: createPowerDto.hero_id,
        power_id: createPowerDto.power_id,
      },
    });
    if (powerExists) {
      throw new HttpException('Power already exists', HttpStatus.CONFLICT);
    }
    try {
      await this.powerRepository.save(createPowerDto);
      return createPowerDto;
    } catch (error) {
      throw new HttpException('Power not created', HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(hero_id: number, power_id: number): Promise<CreatePowerDto> {
    const power = await this.powerRepository.findOne({
      where: { hero_id: hero_id, power_id: power_id },
    });
    if (!power) {
      throw new HttpException('Power not found', HttpStatus.NOT_FOUND);
    }
    return power;
  }

  async update(updatePowerDto: UpdatePowerDto) {
    await this.findOne(updatePowerDto.hero_id, updatePowerDto.power_old_id);
    try {
      this.powerRepository.update(
        {
          power_id: updatePowerDto.power_old_id,
          hero_id: updatePowerDto.hero_id,
        },
        {
          power_id: updatePowerDto.power_id,
          hero_id: updatePowerDto.hero_id,
        },
      );
      return {
        power_id: updatePowerDto.power_id,
        hero_id: updatePowerDto.hero_id,
      };
    } catch (err) {
      throw new HttpException('Power not updated', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(hero_id: number, power_id: number) {
    await this.findOne(hero_id, power_id);
    try {
      await this.powerRepository.delete({ hero_id, power_id });
      return 'Power removed successfully';
    } catch (error) {
      throw new HttpException('Power not removed', HttpStatus.BAD_REQUEST);
    }
  }

  async powersByHero(hero_id: number) {
    return await this.powerRepository.find({
      where: { hero_id: hero_id },
    });
  }
}
