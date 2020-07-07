import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOneOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseCrudService } from '../base/base-crud.service';
import { User } from './user.entity';

@Injectable()
export class UserCrudService extends BaseCrudService<User> {
  constructor(@InjectRepository(User) readonly repository: Repository<User>
  ) {
    super(repository);
  }


  updateUser(userUniqueId: string, model: User): Promise<User> {
    return this.repository
      .findOne({ where: { userUniqueId: userUniqueId } })
      .then(entity => {
        if (!entity) throw new NotFoundException();
        return this.repository.update(userUniqueId, model);
      })
      .then(() => this.repository.findOne({ where: { userUniqueId: userUniqueId } }));
  }

}
