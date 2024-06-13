import { SuperheroesService } from './superheroes.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { superhero } from './entities/superhero.entity';
import { ConfigModule } from '@nestjs/config';

describe('SuperheroesService', () => {
  let service: SuperheroesService;
  const superheroRepository = {
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
        SuperheroesService,
        {
          provide: getRepositoryToken(superhero),
          useValue: superheroRepository,
        },
      ],
    }).compile();
    service = module.get<SuperheroesService>(SuperheroesService);
  });

  const createSuperheroDto = {
    id: 790,
    superhero_name: 'test',
    full_name: 'full teste',
    gender_id: 2,
    eye_colour_id: 4,
    hair_colour_id: 9,
    skin_colour_id: 2,
    race_id: 1,
    publisher_id: 6,
    alignment_id: 3,
    height_cm: 160,
    weight_kg: 60,
  };

  const updatedSuperheroDto = {
    id: 780,
    superhero_name: 'test-update',
  };

  it('should be create a new superhero', async () => {
    superheroRepository.save.mockReturnValue(createSuperheroDto);
    const superHero = await service.create(createSuperheroDto);
    expect(superHero).toEqual(createSuperheroDto);
  });

  it('should be return all superheroes', async () => {
    superheroRepository.find.mockReturnValue([createSuperheroDto]);
    const superHero = await service.findAll();
    expect(superHero).toEqual([createSuperheroDto]);
  });

  it('should be return a superhero by id', async () => {
    superheroRepository.findOne.mockReturnValue(createSuperheroDto);
    const superHero = await service.findOne(createSuperheroDto.id);
    expect(superHero).toEqual(createSuperheroDto);
  });

  it('should be update a superhero', async () => {
    superheroRepository.update.mockReturnValue(updatedSuperheroDto);
    const updateSuperhero = await service.update(
      createSuperheroDto.id,
      updatedSuperheroDto,
    );
    expect(updateSuperhero).toMatchObject(updatedSuperheroDto);
  });

  it('should be remove a superhero', async () => {
    superheroRepository.delete.mockReturnValue(createSuperheroDto);
    const removeSuperhero = await service.remove(createSuperheroDto.id);
    expect(removeSuperhero).toBe('Superhero deleted successfully');
  });
});
