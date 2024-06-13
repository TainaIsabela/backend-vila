import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ClassSerializerInterceptor,
  UseInterceptors,
  SetMetadata,
  Logger,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const IS_PUBLIC_KEY = 'isPublic';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  private readonly logger = new Logger('UsersController');
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Criando novo usuário' })
  create(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID válido de um usuário',
  })
  @ApiOperation({ summary: 'Listando um usuário' })
  profile(@Param('id') id: string) {
    return this.usersService.profile(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID válido de um usuário',
  })
  @ApiOperation({ summary: 'Atualizando um usuário' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch('Deactivate/:id')
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID válido de um usuário',
  })
  @ApiOperation({ summary: 'Desativando um usuário' })
  inactivate(@Param('id') id: string) {
    return this.usersService.inactivate(id);
  }
}
