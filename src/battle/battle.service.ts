import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Power } from 'src/powers/entities/power.entity';
import { Attribute } from 'src/attributes/entities/attribute.entity';
import { superhero } from 'src/superheroes/entities/superhero.entity';

@Injectable()
export class BattleService {
  constructor(
    @InjectRepository(Power)
    private readonly powerRepository: Repository<Power>,
    @InjectRepository(Attribute)
    private readonly attributeRepository: Repository<Attribute>,
    @InjectRepository(superhero)
    private readonly superheroRepository: Repository<superhero>,
  ) {}

  async battle(type: string, first: string, second: string) {
    if (type === 'heroes') {
      return this.battleHeroes(first, second);
    }
    if (type === 'publisher') {
      return this.battlePublisher(first, second);
    }
    return { message: 'Invalid type' };
  }

  async battleHeroes(first: string, second: string) {
    const hero1 = await this.superheroRepository.findOne({
      where: { superhero_name: first },
    });
    const hero2 = await this.superheroRepository.findOne({
      where: { superhero_name: second },
    });
    if (!hero1 || !hero2) {
      return { message: 'Hero not found' };
    }
    const hero1Powers = await this.powerRepository.find({
      where: { hero_id: hero1.id },
    });
    const hero2Powers = await this.powerRepository.find({
      where: { hero_id: hero2.id },
    });
    const hero1Attributes = await this.attributeRepository.find({
      where: { hero_id: hero1.id },
    });
    const hero2Attributes = await this.attributeRepository.find({
      where: { hero_id: hero2.id },
    });

    const hero1Power = hero1Powers.reduce(
      (acc, power) => acc + power.power_id,
      0,
    );

    const hero2Power = hero2Powers.reduce(
      (acc, power) => acc + power.power_id,
      0,
    );

    const hero1Attribute = hero1Attributes.reduce(
      (acc, attribute) => acc + attribute.attribute_id,
      0,
    );

    const hero2Attribute = hero2Attributes.reduce(
      (acc, attribute) => acc + attribute.attribute_id,
      0,
    );

    if (hero1Power + hero1Attribute > hero2Power + hero2Attribute) {
      return { message: `${hero1.superhero_name} wins` };
    } else if (hero1Power + hero1Attribute < hero2Power + hero2Attribute) {
      return { message: `${hero2.superhero_name} wins` };
    } else {
      return { message: 'Draw' };
    }
  }

  async battlePublisher(first: string, second: string) {
    const heroes1 = await this.superheroRepository.find({
      where: { publisher_id: Number(first) },
    });
    const heroes2 = await this.superheroRepository.find({
      where: { publisher_id: Number(second) },
    });
    if (!heroes1.length || !heroes2.length) {
      return { message: 'Publisher not found' };
    }
    let scorePublisher1 = 0;
    let scorePublisher2 = 0;

    const totalHeroes = Math.min(heroes1.length, heroes2.length);

    for (let i = 0; i < totalHeroes; i++) {
      const [hero1, hero2] = [heroes1[i], heroes2[i]];
      const whoWins = await this.battleHeroes(
        hero1.superhero_name,
        hero2.superhero_name,
      );
      console.log(
        whoWins.message + 'vencedor -',
        hero1.superhero_name + ' vs ' + hero2.superhero_name,
      );
      if (whoWins.message.includes(hero1.superhero_name)) {
        scorePublisher1++;
      } else if (whoWins.message.includes(hero2.superhero_name)) {
        scorePublisher2++;
      }
      console.log('score', scorePublisher1, scorePublisher2);
    }

    if (scorePublisher1 > scorePublisher2) {
      return { message: `Publisher ${first} wins` };
    } else if (scorePublisher1 < scorePublisher2) {
      return { message: `Publisher ${second} wins` };
    } else {
      return { message: 'Draw' };
    }
  }
}
