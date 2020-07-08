import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class LoginUserDto {

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
  
  }