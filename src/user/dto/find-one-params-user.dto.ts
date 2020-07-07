import { IsString, IsUUID, IsEmail } from 'class-validator';

export class FindOneParams {
  @IsString()
  @IsUUID()
  userUniqueId: string;
}
