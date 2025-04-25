import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './schedule/models/group';
import { Schedule } from './schedule/models/schedule';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [

    ScheduleModule,

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '34.89.141.175',
      port: 1231,
      username: 'yeunikey',
      password: 'Yerassyl0107',
      database: 'schedule',
      entities: [Schedule, Group],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
