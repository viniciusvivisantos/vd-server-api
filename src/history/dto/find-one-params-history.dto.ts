import { IsString } from 'class-validator';
import { isString } from 'util';

export class FindOneParams {
  @IsString()
  userId: string;
}
