import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('superheroes')
@Controller('superheroes')
export class SuperheroesController {
  constructor(private readonly superheroesService: SuperheroesService) {}

  @Post()
  @ApiOperation({ summary: 'Criando novo super-herói' })
  create(
    @Body() createSuperheroDto: CreateSuperheroDto,
  ): Promise<CreateSuperheroDto> {
    return this.superheroesService.create(createSuperheroDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listando todos os super-heróis' })
  findAll(): Promise<CreateSuperheroDto[]> {
    return this.superheroesService.findAll();
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID válido de um super-herói',
  })
  @ApiOperation({ summary: 'Atualizando um super-herói' })
  update(
    @Param('id') id: number,
    @Body() updateSuperheroDto: UpdateSuperheroDto,
  ): Promise<UpdateSuperheroDto> {
    return this.superheroesService.update(id, updateSuperheroDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID válido de um super-herói',
  })
  remove(@Param('id') id: number) {
    return this.superheroesService.remove(id);
  }
}
