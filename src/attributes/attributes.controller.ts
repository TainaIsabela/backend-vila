import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AttributesService } from './attributes.service';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('attributes')
@Controller('attributes')
export class AttributesController {
  constructor(private readonly attributesService: AttributesService) {}

  @Post()
  @ApiOperation({ summary: 'Criando novo atributo' })
  create(
    @Body() createAttributeDto: CreateAttributeDto,
  ): Promise<CreateAttributeDto> {
    return this.attributesService.create(createAttributeDto);
  }

  @Get(':hero_id')
  @ApiOperation({ summary: 'Listando todos os atributos do Herói' })
  @ApiParam({
    name: 'hero_id',
    type: 'number',
    description: 'ID de um super-herói',
  })
  findAll(@Param('hero_id') hero_id: number): Promise<CreateAttributeDto[]> {
    return this.attributesService.attributesByHero(hero_id);
  }

  @Patch()
  @ApiOperation({ summary: 'Atualizando um atributo' })
  update(@Body() updateAttributeDto: UpdateAttributeDto) {
    return this.attributesService.update(updateAttributeDto);
  }

  @Delete()
  @ApiOperation({ summary: 'Removendo um atributo' })
  remove(
    @Body('attribute_id') attribute_id: number,
    @Body('hero_id') hero_id: number,
  ) {
    return this.attributesService.remove(attribute_id, hero_id);
  }
}
