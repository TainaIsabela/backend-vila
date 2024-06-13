import { Injectable } from '@nestjs/common';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Attribute } from './entities/attribute.entity';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class AttributesService {
  constructor(
    @InjectRepository(Attribute)
    private readonly attributeRepository: Repository<Attribute>,
  ) {}

  async create(
    createAttributeDto: CreateAttributeDto,
  ): Promise<CreateAttributeDto> {
    const attributeExists = await this.attributeRepository.findOne({
      where: {
        hero_id: createAttributeDto.hero_id,
        attribute_id: createAttributeDto.attribute_id,
      },
    });
    if (attributeExists) {
      throw new HttpException('Attribute already exists', HttpStatus.CONFLICT);
    }
    try {
      await this.attributeRepository.save(createAttributeDto);
      return createAttributeDto;
    } catch (error) {
      throw new HttpException('Attribute not created', HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(attribute_id: number, hero_id: number) {
    const attribute = await this.attributeRepository.findOne({
      where: { attribute_id: attribute_id, hero_id: hero_id },
    });
    if (!attribute) {
      throw new HttpException('Attribute not found', HttpStatus.NOT_FOUND);
    }
    return attribute;
  }

  async update(updateAttributeDto: UpdateAttributeDto) {
    await this.findOne(
      updateAttributeDto.attribute_id,
      updateAttributeDto.hero_id,
    );
    try {
      await this.attributeRepository.update(
        {
          attribute_id: updateAttributeDto.attribute_id,
          hero_id: updateAttributeDto.hero_id,
        },
        updateAttributeDto,
      );
    } catch (error) {
      throw new HttpException('Attribute not updated', HttpStatus.BAD_REQUEST);
    }
    return updateAttributeDto;
  }

  async remove(attribute_id: number, hero_id: number) {
    await this.findOne(attribute_id, hero_id);
    try {
      await this.attributeRepository.delete({ attribute_id, hero_id });
    } catch (error) {
      throw new HttpException('Attribute not deleted', HttpStatus.BAD_REQUEST);
    }
    return 'Attribute deleted successfully';
  }

  async attributesByHero(hero_id: number) {
    return await this.attributeRepository.find({
      where: { hero_id: hero_id },
    });
  }
}
