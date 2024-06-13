import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PowersService } from './powers.service';
import { CreatePowerDto } from './dto/create-power.dto';
import { UpdatePowerDto } from './dto/update-power.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('powers')
@Controller('powers')
export class PowersController {
  constructor(private readonly powersService: PowersService) {}

  @Post()
  @ApiOperation({ summary: 'Criando novo poder' })
  create(@Body() createPowerDto: CreatePowerDto): Promise<CreatePowerDto> {
    return this.powersService.create(createPowerDto);
  }

  @Get(':hero_id')
  @ApiOperation({ summary: 'Listando todos os poderes do Herói' })
  @ApiParam({
    name: 'hero_id',
    type: 'number',
    description: 'ID de um super-herói',
  })
  findAll(@Param('hero_id') hero_id: number): Promise<CreatePowerDto[]> {
    return this.powersService.powersByHero(hero_id);
  }

  @Patch()
  @ApiOperation({ summary: 'Atualizando um poder' })
  update(@Body() updatePowerDto: UpdatePowerDto) {
    return this.powersService.update(updatePowerDto);
  }

  @Delete()
  @ApiOperation({ summary: 'Removendo um poder' })
  remove(@Body('hero_id') hero_id: number, @Body('power_id') power_id: number) {
    return this.powersService.remove(hero_id, power_id);
  }
}
