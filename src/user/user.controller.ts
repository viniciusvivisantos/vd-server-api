import { Controller, Get, Body, Post, Param, Query, Put } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { CreateUserDto, ReadUserDto, FindOneParams, UpdateUserDto, LoginUserDto, RecoveryPasswordDto } from './dto';
import { UserService } from './user.service';
import { ResponseMapper } from '../decorator/response-mapper.decorator';
import { ResponseReadUserDto } from './dto/read-user.dto';

@Controller('api/v1/users')
@ApiTags('users')
@ApiResponse({ status: 401, description: 'Não autorizado' })
@ApiResponse({ status: 403, description: 'Acesso negado' })
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Registro inserido com sucesso.', type: ReadUserDto })
  @ApiResponse({ status: 404, description: 'Registro não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro na tentativa de inserir o registro' })
  @ResponseMapper(ReadUserDto)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Post('recoveryPassword')
  @ApiOperation({ summary: 'Solicitação de alteração de senha do usuário' })
  @ApiBody({ type: RecoveryPasswordDto })
  @ApiResponse({ status: 201, description: 'Solicitação enviada com sucesso.', type: ReadUserDto })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro na tentativa de solicitar a alteração de senha do usuário' })
  @ResponseMapper(ReadUserDto)
  async authenticate(@Body() recoveryPasswordDto: RecoveryPasswordDto) {
    return await this.userService.recoveryPassword(recoveryPasswordDto);
  }

  @Put('edit/:userUniqueId')
  @ApiOperation({ summary: 'Alterar informações de usuário' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Registro alterado com sucesso.', type: ReadUserDto })
  @ApiResponse({ status: 404, description: 'Registro não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro na tentativa de alterar o registro' })
  @ApiParam({ name: "userUniqueId" })
  @ResponseMapper(ReadUserDto)
  async update(@Param() params: FindOneParams, @Body() updateUserDto: UpdateUserDto) {
    console.log(`${params.userUniqueId}\n${JSON.stringify(updateUserDto)}`);
    return await this.userService.updateUser(params.userUniqueId, updateUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({ status: 200, description: 'Listagem dos usuários realizadado com sucesso.', type: ResponseReadUserDto })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "offset", required: false, type: Number })
  @ResponseMapper(ResponseReadUserDto)
  async findAll(@Query('limit') limit: number = 100, @Query('offset') page: number = 1) {
    return await this.userService.paginate({ page, limit });
  }

  @Get('uuid/:userUniqueId')
  @ApiOperation({ summary: 'Buscar usuário pelo id' })
  @ApiResponse({ status: 200, description: 'Busca do registro realizadado com sucesso.', type: ReadUserDto })
  @ApiResponse({ status: 404, description: 'Registro não encontrado' })
  @ApiParam({ name: "userUniqueId" })
  @ResponseMapper(ReadUserDto)
  async findByUUId(@Param() params: FindOneParams) {
    return await this.userService.findOne(params.userUniqueId);
  }

  @Get('email/:userEmail')
  @ApiOperation({ summary: 'Buscar usuário pelo email' })
  @ApiResponse({ status: 200, description: 'Busca do registro realizadado com sucesso.', type: ReadUserDto })
  @ApiResponse({ status: 404, description: 'Registro não encontrado' })
  @ApiParam({ name: "userEmail" })
  @ResponseMapper(ReadUserDto)
  async findByEmail(@Param() userEmail: string) {
    const realUserEmail = JSON.parse(JSON.stringify(userEmail)).userEmail;
    return await this.userService.findOneByEmail(realUserEmail);
  }

  @Get('username/:username')
  @ApiOperation({ summary: 'Buscar usuário pelo email' })
  @ApiResponse({ status: 200, description: 'Busca do registro realizadado com sucesso.', type: ReadUserDto })
  @ApiResponse({ status: 404, description: 'Registro não encontrado' })
  @ApiParam({ name: "username" })
  @ResponseMapper(ReadUserDto)
  async findByUsername(@Param() username: string) {
    const realUsername = JSON.parse(JSON.stringify(username)).username;
    return await this.userService.findOneByUsername(realUsername);
  }

}
