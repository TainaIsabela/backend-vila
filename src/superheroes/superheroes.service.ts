import { Injectable } from '@nestjs/common';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { superhero } from './entities/superhero.entity';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class SuperheroesService {
  constructor(
    @InjectRepository(superhero)
    private readonly superheroRepository: Repository<superhero>,
  ) {}

  async create(
    createSuperheroDto: CreateSuperheroDto,
  ): Promise<CreateSuperheroDto> {
    const superheroExists = await this.superheroRepository.findOne({
      where: { superhero_name: createSuperheroDto.superhero_name },
    });
    if (superheroExists) {
      throw new HttpException('Superhero already exists', HttpStatus.CONFLICT);
    }
    const newSuperhero = await this.superheroRepository.save(
      createSuperheroDto,
    );
    if (!newSuperhero) {
      throw new HttpException('Superhero not created', HttpStatus.BAD_REQUEST);
    }
    return newSuperhero;
  }

  async findAll(): Promise<CreateSuperheroDto[]> {
    return await this.superheroRepository.find();
  }

  async findOne(id: number): Promise<CreateSuperheroDto> {
    const superhero = await this.superheroRepository.findOne({
      where: { id: id },
    });
    if (!superhero) {
      throw new HttpException('Superhero not found', HttpStatus.NOT_FOUND);
    }
    return superhero;
  }

  async update(
    id: number,
    updateSuperheroDto: UpdateSuperheroDto,
  ): Promise<UpdateSuperheroDto> {
    await this.findOne(id);
    try {
      this.superheroRepository.update(id, updateSuperheroDto);
    } catch (error) {
      throw new HttpException('Superhero not updated', HttpStatus.BAD_REQUEST);
    }
    return updateSuperheroDto;
  }

  async remove(id: number) {
    await this.findOne(id);
    try {
      await this.superheroRepository.delete(id);
    } catch (error) {
      throw new HttpException('Superhero not deleted', HttpStatus.BAD_REQUEST);
    }
    return 'Superhero deleted successfully';
  }
}
