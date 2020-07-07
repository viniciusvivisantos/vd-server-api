import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsUUID, IsEmail } from 'class-validator';

export class UpdateUserDto {

  @ApiProperty({
    description: 'Nome de usuário'
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Senha do usuário'
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Email do usuário'
  })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  userEmail: string;

}