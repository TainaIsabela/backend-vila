import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { BattleService } from './battle.service';

@ApiTags('battle')
@Controller('battle')
export class BattleController {
  constructor(private readonly battleService: BattleService) {}
  @Get()
  @ApiOperation({ summary: 'Batalha entre Heróis' })
  @ApiParam({
    name: 'type',
    type: 'string',
    description: 'Tipo de batalha',
  })
  @ApiParam({
    name: 'first',
    type: 'string',
    description: 'Primeiro nome',
  })
  @ApiParam({
    name: 'second',
    type: 'string',
    description: 'Segundo nome',
  })
  Battle(
    @Query('type') type: string,
    @Query('first') first: string,
    @Query('second') second: string,
  ) {
    return this.battleService.battle(type, first, second);
  }
}
