import { NotFoundException } from '@nestjs/common';
import { Repository, DeleteResult, FindOneOptions } from 'typeorm';
import { paginate } from 'nestjs-typeorm-paginate/dist/paginate';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

export class BaseCrudService<TEntity> {
  constructor(private readonly baseRepository: Repository<TEntity>) {}

  create(model: TEntity): Promise<TEntity> {
    return this.baseRepository.save(model);
  }

  find(options?: FindOneOptions<TEntity>): Promise<TEntity[]> {
    return this.baseRepository.find(options);
  }

  findOne(
    idOrOptions: FindOneOptions<TEntity>,
  ): Promise<TEntity> {
    return this.baseRepository.findOne(idOrOptions as any).then(entity => {
      if (!entity) throw new NotFoundException();
      return entity;
    });
  }

  findPaginated(
    idOptions: FindOneOptions<TEntity>,
    paginationOptions: IPaginationOptions,
  ) {
    return paginate<TEntity>(
      this.baseRepository,
      paginationOptions,
      idOptions,
    ).then(entity => {
      if (!entity || entity.itemCount === 0) throw new NotFoundException();
      return entity;
    });
  }

  update(id: number | string, model: TEntity): Promise<TEntity> {
    return this.baseRepository
      .findOne(id)
      .then(entity => {
        if (!entity) throw new NotFoundException();
        return this.baseRepository.update(id, model);
      })
      .then(() => this.baseRepository.findOne(id));
  }

  delete(id: number | string): Promise<DeleteResult> {
    return this.baseRepository.findOne(id).then(entity => {
      if (!entity) throw new NotFoundException();
      return this.baseRepository.delete(id);
    });
  }

  queryBuilder() {
    return this.baseRepository.createQueryBuilder();
  }
}
