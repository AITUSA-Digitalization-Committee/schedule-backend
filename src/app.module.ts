import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './schedule/models/group';
import { Schedule } from './schedule/models/schedule';
import { ScheduleModule } from './schedule/schedule.module';
import { ScheduleModule as NestScheduleModule } from '@nestjs/schedule'; // <<< ВАЖНО!
import { CacheModule } from '@nestjs/cache-manager';

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
