import { Test, TestingModule } from '@nestjs/testing';
import { AttributesService } from './attributes.service';
import { ConfigModule } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Attribute } from './entities/attribute.entity';

describe('AttributesService', () => {
  let service: AttributesService;
  const attributeRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        AttributesService,
        {
          provide: getRepositoryToken(Attribute),
          useValue: attributeRepository,
        },
      ],
    }).compile();
    service = module.get<AttributesService>(AttributesService);
  });

  const createAttributeDto = {
    hero_id: 780,
    attribute_id: 1,
    attribute_value: 90,
  };

  const updatedAttributeDto = {
    hero_id: 780,
    attribute_id: 1,
    attribute_value: 45,
  };

  it('should be create a new attribute', async () => {
    attributeRepository.save.mockReturnValue(createAttributeDto);
    const attribute = await service.create(createAttributeDto);
    expect(attribute).toEqual(createAttributeDto);
  });

  it('should be return all attributes by hero', async () => {
    attributeRepository.find.mockReturnValue([createAttributeDto]);
    const attribute = await service.attributesByHero(
      createAttributeDto.hero_id,
    );
    expect(attribute).toEqual([createAttributeDto]);
  });

  it('should be return a attribute', async () => {
    attributeRepository.findOne.mockReturnValue(createAttributeDto);
    const attribute = await service.findOne(
      createAttributeDto.hero_id,
      createAttributeDto.attribute_id,
    );
    expect(attribute).toEqual(createAttributeDto);
  });

  it('should be update a attribute', async () => {
    attributeRepository.update.mockReturnValue(updatedAttributeDto);
    const attribute = await service.update(updatedAttributeDto);
    expect(attribute).toEqual(updatedAttributeDto);
  });

  it('should be remove a attribute', async () => {
    attributeRepository.delete.mockReturnValue(updatedAttributeDto);
    const attribute = await service.remove(
      createAttributeDto.hero_id,
      createAttributeDto.attribute_id,
    );
    expect(attribute).toBe('Attribute deleted successfully');
  });
});
