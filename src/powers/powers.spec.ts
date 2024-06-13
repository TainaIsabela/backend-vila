import { Test, TestingModule } from '@nestjs/testing';
import { PowersService } from './powers.service';
import { ConfigModule } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Power } from './entities/power.entity';

describe('PowersController', () => {
  let service: PowersService;
  const powerRepository = {
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
        PowersService,
        {
          provide: getRepositoryToken(Power),
          useValue: powerRepository,
        },
      ],
    }).compile();
    service = module.get<PowersService>(PowersService);
  });

  const createPowerDto = {
    hero_id: 788,
    power_id: 1,
  };

  const updatedPowerDto = {
    hero_id: 788,
    power_old_id: 1,
    power_id: 12,
  };

  it('should be create a new power', async () => {
    powerRepository.save.mockReturnValue(createPowerDto);
    const power = await service.create(createPowerDto);
    expect(power).toEqual(createPowerDto);
  });

  it('should be return all powers by hero', async () => {
    powerRepository.find.mockReturnValue([createPowerDto]);
    const power = await service.powersByHero(createPowerDto.hero_id);
    expect(power).toEqual([createPowerDto]);
  });

  it('should be return a power', async () => {
    powerRepository.findOne.mockReturnValue(createPowerDto);
    const power = await service.findOne(
      createPowerDto.hero_id,
      createPowerDto.power_id,
    );
    expect(power).toEqual(createPowerDto);
  });

  it('should be update a power', async () => {
    powerRepository.update.mockReturnValue(updatedPowerDto);
    const power = await service.update(updatedPowerDto);
    expect(power).toEqual({
      hero_id: updatedPowerDto.hero_id,
      power_id: updatedPowerDto.power_id,
    });
  });

  it('should be remove a power', async () => {
    powerRepository.delete.mockReturnValue({ affected: 1 });
    const power = await service.remove(
      updatedPowerDto.hero_id,
      updatedPowerDto.power_id,
    );
    expect(power).toBe('Power removed successfully');
  });
});
