import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HashService } from '../auth/hash.service';
import { UserDocument } from './schemas/user.schema';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private usersRepository: Model<UserDocument>,
    private hashService: HashService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const userAlreadyExists = await this.usersRepository.findOne({
      $or: [{ cpf: createUserDto.cpf }, { email: createUserDto.email }],
    });
    if (userAlreadyExists) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    createUserDto.password = await this.hashService.hashPassword(
      createUserDto.password,
    );
    createUserDto.isActive = true;
    try {
      this.usersRepository.create(createUserDto);
    } catch (error) {
      throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST);
    }
    return createUserDto;
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({
      $or: [{ cpf: id }, { email: id }],
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return {
      id: user.id,
      cpf: user.cpf,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      bio: user.bio,
      password: user.password,
      tokenVersion: user.tokenVersion,
      isActive: user.isActive,
    };
  }

  async profile(id: string) {
    const user = await this.findOne(id);
    return {
      id: user.id,
      cpf: user.cpf,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      bio: user.bio,
      isActive: user.isActive,
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await this.hashService.hashPassword(
        updateUserDto.password,
      );
    }
    const user = await this.findOne(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    await this.usersRepository.updateOne(
      { $or: [{ cpf: id }, { email: id }] },
      updateUserDto,
    );
    const updatedUser = await this.profile(id);
    return updatedUser;
  }

  async inactivate(id: string) {
    const user = await this.findOne(id);
    if (user.isActive) {
      await this.usersRepository.updateOne(
        { $or: [{ cpf: id }, { email: id }] },
        { isActive: false },
      );
    } else {
      throw new HttpException(
        'User already inactivated',
        HttpStatus.BAD_REQUEST,
      );
    }
    return 'User inactivated successfully';
  }
}
