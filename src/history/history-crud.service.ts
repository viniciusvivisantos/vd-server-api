import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseCrudService } from '../base/base-crud.service';
import { History } from './history.entity';

@Injectable()
export class HistoryCrudService extends BaseCrudService<History> {
  constructor(@InjectRepository(History) readonly repository: Repository<History>) {
    super(repository);
  }
}