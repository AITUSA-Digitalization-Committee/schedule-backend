import { CacheModule } from '@nestjs/cache-manager';
import { Group } from './schedule/models/group';
import { Module } from '@nestjs/common';
import { ScheduleModule as NestScheduleModule } from '@nestjs/schedule'; // <<< ВАЖНО!
import { Schedule } from './schedule/models/schedule';
import { ScheduleModule } from './schedule/schedule.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [

    ScheduleModule,
    NestScheduleModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '35.234.116.136',
      port: 1231,
      username: 'yeunikey',
      password: 'Yerassyl0107',
      database: 'schedule',
      entities: [Schedule, Group],
      synchronize: true,
    }),
    CacheModule.register({ ttl: 30 * 60 * 1000, isGlobal: true })
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
