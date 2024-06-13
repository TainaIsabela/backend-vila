import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Power } from 'src/powers/entities/power.entity';
import { Attribute } from 'src/attributes/entities/attribute.entity';
import { superhero } from 'src/superheroes/entities/superhero.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Power)
    private readonly powerRepository: Repository<Power>,
    @InjectRepository(Attribute)
    private readonly attributeRepository: Repository<Attribute>,
    @InjectRepository(superhero)
    private readonly superheroRepository: Repository<superhero>,
  ) {}

  async report(
    order: string,
    orderBy: string,
    page: number,
    limit: number,
    attribute: number,
    power: number,
    alignment: number,
    publisher: number,
  ) {
    const superheroes = await this.superheroRepository.find();
    const powers = await this.powerRepository.find();
    const attributes = await this.attributeRepository.find();

    let report = superheroes.map((superhero) => {
      const heroPowers = powers.filter(
        (power) => power.hero_id === superhero.id,
      );
      const heroAttributes = attributes.filter(
        (attribute) => attribute.hero_id === superhero.id,
      );

      return {
        superhero,
        powers: heroPowers,
        attributes: heroAttributes,
      };
    });

    if (attribute) {
      report = report.filter((hero) => {
        return hero.attributes.some((attr) => attr.attribute_id == attribute);
      });
    }
    if (power) {
      report = report.filter((hero) => {
        return hero.powers.some((pow) => pow.power_id == power);
      });
    }
    if (alignment) {
      report = report.filter((hero) => {
        return hero.superhero.alignment_id == alignment;
      });
    }
    if (publisher) {
      report = report.filter((hero) => {
        return hero.superhero.publisher_id == publisher;
      });
    }

    report = report.sort((a, b) => {
      if (order === 'Asc' && orderBy === 'Attribute') {
        return a.attributes.length - b.attributes.length;
      }
      if (order === 'Desc' && orderBy === 'Attribute') {
        return b.attributes.length - a.attributes.length;
      }
      if (order === 'Asc' && orderBy === 'Power') {
        return a.powers.length - b.powers.length;
      }
      if (order === 'Desc' && orderBy === 'Power') {
        return b.powers.length - a.powers.length;
      }
    });

    // Paginação
    const total = report.length;
    const start = (page - 1) * limit;
    const end = page * limit;
    report = report.slice(start, end);

    return {
      page: page,
      report,
      end: end,
      total: total,
    };
  }
}
