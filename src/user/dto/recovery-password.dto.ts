import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';


export class RecoveryPasswordDto {

  @ApiProperty({
    description: 'Nome de usuário'
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Email do usuário'
  })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  userEmail: string;

}