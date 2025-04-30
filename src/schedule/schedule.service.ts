import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";
import { Schedule } from "./models/schedule";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Injectable()
export class ScheduleService {

    constructor(
        @InjectRepository(Schedule)
        private scheduleRepo: Repository<Schedule>,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) { }

    async findById(id: number) {

        const cached = await this.cacheManager.get<Schedule>(`schedule:${id}`);
        if (cached) {
            return cached;
        }

        const schedule = await this.scheduleRepo.findOneBy({
            id: id
        });

        if (schedule) {
            await this.cacheManager.set(`schedule:${id}`, schedule, 180 * 1000);
        }

        return schedule;
    }

    async findByGroupAndDay(group_name: string, currentDay: string) {

        const cached = await this.cacheManager.get<Schedule[]>(`schedules:${group_name + '-' + currentDay}`);
        if (cached) {
            return cached;
        }

        const schedules = await this.scheduleRepo.find({
            where: {
                group: {
                    name: group_name
                },
                day: currentDay
            },
            relations: ['group']
        });

        if (schedules) {
            await this.cacheManager.set(`schedules:${group_name + '-' + currentDay}`, schedules, 180 * 1000);
        }

        return schedules;
    }

    async save(schedule: DeepPartial<Schedule>) {
        await this.cacheManager.del(`schedule:${schedule.id}`);
        return await this.scheduleRepo.save(schedule);
    }

    async delete(id: number) {
        await this.cacheManager.del(`schedule:${id}`);
        return await this.scheduleRepo.delete(id);
    }

} 