import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @ApiProperty({
    description: 'Email do usuário, um dos indentificadores do usuário',
  })
  @Prop()
  email: string;

  @ApiProperty({ description: 'Nome do usuário' })
  @Prop()
  name: string;

  @ApiProperty({
    description: 'CPF do usuário, um dos indentificadores do usuário',
  })
  @Prop()
  cpf: string;

  @ApiProperty({ description: 'Senha do usuário' })
  @Prop()
  password: string;

  @ApiProperty({ description: 'Foto de perfil do usuário' })
  @Prop()
  profilePicture: string;

  @ApiProperty({ description: 'Biografia do usuário' })
  @Prop()
  bio: string;

  @ApiProperty({ description: 'Versão do toke do usuário' })
  @Prop({ default: 0 })
  tokenVersion: number;

  @ApiProperty({ description: 'Status de atividade do usuário' })
  @Prop({ default: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
