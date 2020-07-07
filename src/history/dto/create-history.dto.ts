import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min, MaxLength, Max, IsString, IsDate } from 'class-validator';

export class CreateHistoryDto {
  @ApiProperty({
    description: 'Id do Usuario'
  })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'ID do motivo'
  })
  @IsNotEmpty()
  @IsString()
  motiveId: string;

  @ApiProperty({
    description: 'Data do Bloqueio/Desbloqueio'
  })
  @IsNotEmpty()
  @IsDate()
  date: Date;
}