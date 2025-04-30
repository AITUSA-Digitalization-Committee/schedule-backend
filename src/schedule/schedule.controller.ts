import { Controller, Get, Param, Query } from "@nestjs/common";
import { GroupService } from "./group.service";

import { ScheduleService } from "./schedule.service";

@Controller('schedule')
export class ScheduleController {

    constructor(
        private groupService: GroupService,
        private scheduleService: ScheduleService,
    ) { }

    @Get('/group/:group_name')
    async get(@Param() params: { group_name: string }) {

        const group = await this.groupService.findByName(params.group_name);

        if (!group) {
            return {
                statusCode: 400,
                message: "Группа не найдена"
            };
        }

        return {
            statusCode: 200,
            data: group
        }
    }

    @Get('/filter')
    async filter(@Query('groupName') group_name: string, @Query('day') day: string) {

        const schedules = await this.scheduleService.findByGroupAndDay(group_name, day);

        return {
            statusCode: 200,
            data: schedules
        }
    }

}