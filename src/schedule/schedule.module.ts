import { Module } from "@nestjs/common";
import { ScheduleService } from "./schedule.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Schedule } from "./models/schedule";
import { Group } from "./models/group";
import { ScheduleController } from "./schedule.controller";
import { GroupService } from "./group.service";
import { NotifierService } from "./notifier.service";

@Module({
    providers: [
        ScheduleService,
        GroupService,
        NotifierService
    ],
    controllers: [
        ScheduleController,
    ],

    imports: [
        TypeOrmModule.forFeature([Schedule, Group]),
    ],
    exports: [
        ScheduleService
    ]
})
export class ScheduleModule { }