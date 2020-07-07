import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min, MaxLength, Max, IsString, IsEmail } from 'class-validator';


export class CreateUserDto {

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