import { Logger, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { SuperheroesModule } from './superheroes/superheroes.module';
import { AttributesModule } from './attributes/attributes.module';
import { PowersModule } from './powers/powers.module';
import { superhero } from './superheroes/entities/superhero.entity';
import { Power } from './powers/entities/power.entity';
import { Attribute } from './attributes/entities/attribute.entity';
import { ReportsModule } from './reports/reports.module';
import { BattleModule } from './battle/battle.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/vila'),
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: Number(process.env.POSTGRES_PORT),
      host: process.env.POSTGRES_HOST,
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      entities: [superhero, Power, Attribute],
      synchronize: false,
    }),
    UsersModule,
    AuthModule,
    SuperheroesModule,
    PowersModule,
    AttributesModule,
    ReportsModule,
    BattleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useExisting: JwtAuthGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    JwtAuthGuard,
    Logger,
  ],
})
export class AppModule {}
