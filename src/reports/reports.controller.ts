import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ReportsService } from './reports.service';

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}
  @Get()
  @ApiOperation({ summary: 'Listando todos os Heróis' })
  @ApiParam({
    name: 'filters',
    type: 'array',
    description: 'Filtros para a busca',
  })
  @ApiParam({
    name: 'order',
    type: 'string',
    description: 'Ordenação dos resultados',
  })
  @ApiParam({
    name: 'orderBy',
    type: 'string',
    description: 'Campo para ordenação',
  })
  @ApiParam({
    name: 'page',
    type: 'number',
    description: 'Página atual',
  })
  @ApiParam({
    name: 'limit',
    type: 'number',
    description: 'Quantidade de itens por página',
  })
  Report(
    @Query('order') order: string,
    @Query('orderBy') orderBy: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('attribute') attribute: number,
    @Query('power') power: number,
    @Query('alignment') alignment: number,
    @Query('publisher') publisher: number,
  ) {
    return this.reportsService.report(
      order,
      orderBy,
      page,
      limit,
      attribute,
      power,
      alignment,
      publisher,
    );
  }
}
