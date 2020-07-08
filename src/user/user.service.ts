import { Injectable, HttpException, HttpService } from '@nestjs/common';
import { AxiosError } from 'axios';
import { User as User } from './user.entity';
import { UserCrudService } from './user-crud.service';
import { CreateUserDto, ReadUserDto, LoginUserDto, RecoveryPasswordDto, } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, getConnection } from 'typeorm';
import { paginate, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { LogService } from 'src/logger/log.service';
import { HistoryService } from '../history/history.service'
import { UpdateUserDto } from './dto/update-user.dto';
import { encryptPassword } from 'src/utils/encrypt-password';
@Injectable()
export class UserService {
  constructor(
    private readonly userCrudService: UserCrudService,
    private readonly logger: LogService,
    @InjectRepository(User) private readonly repository: Repository<ReadUserDto>,
    private readonly httpService: HttpService,
    private readonly historyService: HistoryService) {
    this.httpService.axiosRef.interceptors.response.use(undefined, (err: AxiosError) => {
      throw new HttpException(err.response, err.response.status)
    });
  }
  async create(dtoUser: CreateUserDto) {
    let user = new User();
    user.username = dtoUser.username;
    user.password = await encryptPassword(dtoUser.password);
    user.userEmail = dtoUser.userEmail;

    return await this.userCrudService.create(user).then(async response => {
      return response;
    }).catch(error => {
      const errorDetails = JSON.parse(JSON.stringify(error));
      this.logger.error(`Erro ao tentar criar o usuário '${user.username}'\nErro: ${error}`);
      throw new HttpException(`Houve um erro ao tentar criar o usuario '${user.username}'`, errorDetails.status);
    })
  }

  async paginate(options: IPaginationOptions) {
    return await paginate<ReadUserDto>(this.repository, options);;
  }
  async findOne(userUniqueId: string) {
    return await this.userCrudService.findOne({ where: { userUniqueId: userUniqueId } }).catch(error => {
      const errorDetails = JSON.parse(JSON.stringify(error));
      this.logger.error(`Erro ao buscar o UUID ${userUniqueId}'\nErro: ${error}`);
      throw new HttpException(`Houve um erro ao buscar o UUID ${userUniqueId}'`, errorDetails.status);
    });
  }

  async authenticateUser(dtoAuthenticate: LoginUserDto) {
    const md5 = require('md5');
    const responseUser = await this.userCrudService.findOne({ where: { username: dtoAuthenticate.username } }).catch(error => {
      const errorDetails = JSON.parse(JSON.stringify(error));
      this.logger.error(`Nome de usuário ou senha inválido! \nUsuário: ${dtoAuthenticate.username} \nErro: ${error}`)
      throw new HttpException(`Nome de usuário ou senha inválido! \nUsuário: ${dtoAuthenticate.username}`, errorDetails.status);
    });
    if (responseUser) {
      const encryptedPassword = await encryptPassword(dtoAuthenticate.password);
      if (encryptedPassword == responseUser.password) {
        return responseUser;
      } else {
        this.logger.error(`Senha inválida, user: '${dtoAuthenticate.username}'`);
        throw new HttpException(`Nome de usuário ou senha inválido! \nUsuário: ${dtoAuthenticate.username}`, 401);
      }
    }
  }

  async recoveryPassword(recoveryPasswordDto: RecoveryPasswordDto){
    const responseUser = await this.userCrudService.findOne({ where: { username: recoveryPasswordDto.username, userEmail: recoveryPasswordDto.userEmail } }).catch(error => {
      const errorDetails = JSON.parse(JSON.stringify(error));
      this.logger.error(`Erro ao buscar o usuário ${recoveryPasswordDto.username} ou o email ${recoveryPasswordDto.userEmail}\nErro: ${error}`);
      throw new HttpException(`Nome de usuário ou email inválido! \nUsuário ${recoveryPasswordDto.username} | Email: ${recoveryPasswordDto.userEmail}`, errorDetails.status);
    });
    if(responseUser){
      return responseUser;
    }else{
      this.logger.error(`Erro ao buscar o usuário ${recoveryPasswordDto.username} ou o email ${recoveryPasswordDto.userEmail}`);
      throw new HttpException(`Nome de usuário ou email inválido! \nUsuário ${recoveryPasswordDto.username} | Email: ${recoveryPasswordDto.userEmail}`, 404);
    }
  }

  async findOneByEmail(userEmail: string) {
    return await this.userCrudService.findOne({ where: { userEmail: userEmail } }).catch(error => {
      const errorDetails = JSON.parse(JSON.stringify(error));
      this.logger.error(`Erro ao buscar o email '${userEmail}'\nErro: ${error}`);
      throw new HttpException(`Houve um erro ao buscar o email '${userEmail}'`, errorDetails.status);
    });
  }

  async findOneByUsername(username: string) {
    return await this.userCrudService.findOne({ where: { username: username } }).catch(error => {
      const errorDetails = JSON.parse(JSON.stringify(error));
      this.logger.error(`Erro ao buscar o usuário '${username}'\nErro: ${error}`);
      throw new HttpException(`Houve um erro ao buscar o usuário '${username}'`, errorDetails.status);
    });
  }

  async updateUser(userUniqueId: string, dtoUpdate: UpdateUserDto) {
    let user = new User();
    const responseUser = await this.userCrudService.findOne({ where: { userUniqueId: userUniqueId } }).catch(error => {
      const errorDetails = JSON.parse(JSON.stringify(error));
      this.logger.error(`Erro ao tentar atualizar o usuário ${user.userUniqueId ? `'${user.userUniqueId} -` : ''} ${user.username ? `${user.username}'` : ''}\nErro: ${error}`);
      throw new HttpException(`Houve um erro ao tentar atualizar o usuario ${user.userUniqueId ? `'${user.userUniqueId} -` : ''} ${user.username ? `${user.username}'` : ''}`, errorDetails.status);
    });
    if (responseUser) {
      user.password = await encryptPassword(dtoUpdate.password);
      user.userEmail = dtoUpdate.userEmail;
      user.username = dtoUpdate.username;

      return await this.userCrudService.updateUser(userUniqueId, user).catch(error => {
        const errorDetails = JSON.parse(JSON.stringify(error));
        this.logger.error(`Erro ao tentar atualizar o usuário '${user.userUniqueId} - ${user.username}'\nErro: ${error}`);
        throw new HttpException(`Houve um erro ao tentar atualizar o usuario '${user.userUniqueId} - ${user.username}'`, errorDetails.status);
      });
    }
  }
}
