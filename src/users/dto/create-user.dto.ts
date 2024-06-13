import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from '@nestjs/class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Email utilizado pelo usuário',
    example: 'teste@gmail.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Nome do usuário',
    example: 'John Doe',
  })
  @IsString()
  @Matches(/\w+/)
  name: string;

  @ApiProperty({
    description: 'url da foto de perfil do usuário',
    example: 'https://example.com/image.jpg',
  })
  @IsString()
  profilePicture: string;

  @ApiProperty({
    description: 'Biografia do usuário',
    example: 'Desenvolvedor de software',
  })
  @IsString()
  bio: string;

  @ApiProperty({
    description: 'CPF do usuário',
    example: '123.456.789-10',
  })
  @IsString()
  @Matches(/\d{3}\.\d{3}\.\d{3}-\d{2}/)
  cpf: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: '********',
  })
  @IsString()
  // Senha com pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um número ou caractere especial
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d|.*[^a-zA-Z0-9]).{8,}$/)
  password: string;

  tokenVersion = 0;

  isActive = true;
}
