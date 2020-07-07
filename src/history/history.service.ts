import { Injectable, HttpException, HttpService } from "@nestjs/common";
import { LogService } from "../logger/log.service";
import { HistoryCrudService } from "./history-crud.service";
import { History } from "./history.entity"
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ReadHistoryDto, CreateHistoryDto } from "./dto";
import { AxiosError } from 'axios';
import { IPaginationOptions, paginate } from "nestjs-typeorm-paginate";

@Injectable()
export class HistoryService {
  constructor(
    private readonly historyCrudService: HistoryCrudService,
    private readonly logger: LogService,
    @InjectRepository(History) private readonly repository: Repository<ReadHistoryDto>,
    private readonly httpService: HttpService) {
    this.httpService.axiosRef.interceptors.response.use(undefined, (err: AxiosError) => {
      throw new HttpException(err.response, err.response.status)
    });
  }

  async create(dtoCreate: CreateHistoryDto) {
    let history = new History();

    history.date = dtoCreate.date;
    history.motiveId = dtoCreate.motiveId;
    history.userId = dtoCreate.userId

    return await this.historyCrudService.create(history).then(async response => {
      return response;
    }).catch(error => {
      this.logger.error(`Erro ao tentar inserir histórico '${history.userId} - ${history.motiveId} - ${history.date}'\nErro: ${error}`)
      throw new HttpException(`Houve um erro ao tentar ao tentar inserir histórico '${history.userId} - ${history.motiveId} - ${history.date}`, 400);
    })

  }
  async paginate(options: IPaginationOptions) {
    return await paginate<ReadHistoryDto>(this.repository, options);;
  }
  async findOne(id: string) {
    return await this.historyCrudService.findOne({ where: { userId: id } });
  }

}

