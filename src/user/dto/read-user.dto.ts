import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type, Exclude } from 'class-transformer';
import { ResponseSuccess, PaginateResponseDto } from '../../base/dto/defaultResponse.dto';
import { IsUUID } from 'class-validator';


export class ReadUserDto {
  @IsUUID()
  @ApiProperty({
    description: 'UniqueId do usuário'
  })
  @Expose()
  userUniqueId: string;

  @ApiProperty({
    description: 'Nome de usuário'
  })
  @Expose()
  username: string

  @ApiProperty({
    description: "Senha do usuário"
  })
  @Exclude()
  password: string;

  @ApiProperty({
    description: 'Email do usuário'
  })
  @Expose()
  userEmail: string;

  @ApiProperty({
    description: 'Data de criação'
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    description: 'Data de alteração'
  })
  @Expose()
  updatedAt: Date;
}

export class ResponseReadUserDto extends PaginateResponseDto<ReadUserDto[]> {
  @ApiProperty({ type: ReadUserDto, isArray: true })
  @Expose()
  @Type(() => ReadUserDto)
  items: ReadUserDto[];
}
