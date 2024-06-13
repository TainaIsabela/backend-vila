import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { ConfigModule } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './schemas/user.schema';
import { HashService } from '../auth/hash.service';

describe('UsersService', () => {
  let service: UsersService;
  const mockUserModel: Model<UserDocument> = {
    findOne: jest.fn(),
    create: jest.fn(),
    updateOne: jest.fn(),
  } as any;
  const mockHashService = new HashService();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: mockUserModel,
        },
        {
          provide: HashService,
          useValue: mockHashService,
        },
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
  });

  const createUserDto = {
    name: 'Jane Doe',
    email: 'Jane@example.com',
    cpf: '12345678902',
    password: 'Senha123',
    profilePicture: 'profilePicture',
    bio: 'bio',
    tokenVersion: 0,
    isActive: true,
  };

  const updateUserDto = {
    name: 'Jane Doe Updated',
    email: 'JaneUp@example.com',
    cpf: '12345678902',
    password: 'Senha123',
    profilePicture: 'profilePicture Updated',
    bio: 'bio',
    tokenVersion: 1,
    isActive: true,
  };

  it('should be create a new user', async () => {
    const result = await service.create(createUserDto);
    expect(result).toEqual(createUserDto);
  });

  it('should be find a user - CPF', async () => {
    mockUserModel.findOne = jest.fn().mockReturnValue(createUserDto);
    const result = await service.findOne(createUserDto.cpf);
    expect(result).toEqual(createUserDto);
  });

  it('should be find a user - Email', async () => {
    mockUserModel.findOne = jest.fn().mockReturnValue(createUserDto);
    const result = await service.findOne(createUserDto.email);
    expect(result).toEqual(createUserDto);
  });

  it('should be return a user profile', async () => {
    mockUserModel.findOne = jest.fn().mockReturnValue(createUserDto);
    const result = await service.profile(createUserDto.cpf);
    expect(result).toEqual({
      id: result.id,
      cpf: createUserDto.cpf,
      name: createUserDto.name,
      email: createUserDto.email,
      profilePicture: createUserDto.profilePicture,
      bio: createUserDto.bio,
      isActive: createUserDto.isActive,
    });
  });

  it('should be update a user', async () => {
    mockUserModel.findOne = jest.fn().mockReturnValue(updateUserDto);
    const result = await service.update(createUserDto.cpf, updateUserDto);
    expect(result).toEqual({
      id: result.id,
      cpf: updateUserDto.cpf,
      name: updateUserDto.name,
      email: updateUserDto.email,
      profilePicture: updateUserDto.profilePicture,
      bio: createUserDto.bio,
      isActive: createUserDto.isActive,
    });
  });

  it('should be inactivate a user', async () => {
    mockUserModel.updateOne = jest.fn().mockReturnValue(updateUserDto);
    const result = await service.inactivate(createUserDto.cpf);
    expect(result).toBe('User inactivated successfully');
  });
});
