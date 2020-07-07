import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type, Exclude } from 'class-transformer';
import { ResponseSuccess, PaginateResponseDto } from '../../base/dto/defaultResponse.dto';

export class ReadHistoryDto {
  @ApiProperty({
    description: 'ID do histórico'
  })
  @Expose()
  
  historyId: number;
  @ApiProperty({
    description: 'ID do usuário'
  })
  @Expose()
  userId: number;

  @ApiProperty({
    description: 'Id do motivo'
  })
  @Expose()
  motiveId: number;

  @ApiProperty({
    description: 'Data histórico'
  })
  @Expose()
  date: Date;

  @Expose()
  createdAt: Date;

  @ApiProperty({
    description: 'Data de alteração'
  })
  @Expose()
  updatedAt: Date;
}

export class ResponseReadHistoryDto extends PaginateResponseDto<ReadHistoryDto[]> {
  @ApiProperty({ type: ReadHistoryDto, isArray: true })
  @Expose()
  @Type(() => ReadHistoryDto)
  items: ReadHistoryDto[];
}
