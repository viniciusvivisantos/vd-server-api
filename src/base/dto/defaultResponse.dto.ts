import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class Meta {
  @ApiProperty({
    description: 'Servidor',
  })
  @Expose()
  server: string;

  @ApiProperty({
    description: 'Limit',
  })
  @Expose()
  limit: number;

  @ApiProperty({
    description: 'offset',
  })
  @Expose()
  offset: number;

  @ApiProperty({
    description: 'Quantidade de Registros',
  })
  @Expose()
  recordCount: number;
}

export abstract class ResponseSuccess<TypeData> {
  abstract get records(): TypeData;

  @ApiProperty({
    description: 'Informações do Retorno',
  })
  @Expose()
  meta: Meta;
}

export abstract class PaginateResponseDto<TypeData> {
  abstract get items(): TypeData;

  @ApiProperty({
    description: 'Quantidade de itens',
  })
  @Expose()
  itemCount: number;

  @ApiProperty({
    description: 'Próximo item',
  })
  @Expose()
  next: string;

  @ApiProperty({
    description: 'Quantidade de páginas',
  })
  @Expose()
  pageCount: number;

  @ApiProperty({
    description: 'Item anterior',
  })
  @Expose()
  previous: string;

  @ApiProperty({
    description: 'Total de itens',
  })
  @Expose()
  totalItems: number;

}
