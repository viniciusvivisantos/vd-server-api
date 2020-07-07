import { Controller, Get, Body, Post, Param, UseInterceptors, Query } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { CreateHistoryDto, ReadHistoryDto, FindOneParams } from './dto';
import { HistoryService } from './history.service';
import { ResponseMapper } from '../decorator/response-mapper.decorator';
import { HttpSuccessFilter } from '../filter/http-success.filter';
import { Meta } from '../base/dto/defaultResponse.dto';
import { ResponseReadHistoryDto } from './dto/read-history.dto';

@Controller('api/v1/history')
@ApiTags('history')
@ApiResponse({ status: 401, description: 'Não autorizado' })
@ApiResponse({ status: 403, description: 'Acesso negado' })
export class HistoryController {
    constructor(private readonly historyService: HistoryService) { }
    @Get()
    @ApiOperation({ summary: 'Listar todo histórico' })
    @ApiResponse({ status: 200, description: 'Listagem do histórico realizadado com sucesso.', type: ResponseReadHistoryDto })
    @ApiQuery({ name: "limit", required: false, type: Number })
    @ApiQuery({ name: "offset", required: false, type: Number })
    @UseInterceptors(HttpSuccessFilter)
    @ResponseMapper(ResponseReadHistoryDto)
    async findAll(@Query('limit') limit: number = 100, @Query('offset') page: number = 1) {
        return await this.historyService.paginate({ page, limit });
    }

    @Get(':userId')
    @ApiOperation({ summary: 'Buscar Histórico do usuário pelo id' })
    @UseInterceptors(HttpSuccessFilter)
    @ApiResponse({ status: 200, description: 'Busca do registro realizadado com sucesso.', type: ResponseReadHistoryDto })
    @ApiResponse({ status: 404, description: 'Registro não encontrado' })
    @ApiParam({ name: "userId" })
    @ResponseMapper(ResponseReadHistoryDto)
    async findById(@Param() params: FindOneParams) {
        return await this.historyService.findOne(params.userId);
    }

}