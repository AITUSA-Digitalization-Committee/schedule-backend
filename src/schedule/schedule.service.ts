import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";
import { Schedule } from "./models/schedule";

@Injectable()
export class ScheduleService {

    constructor(
        @InjectRepository(Schedule)
        private scheduleRepo: Repository<Schedule>,
    ) { }

    async findById(id: number) {
        return await this.scheduleRepo.findOneBy({
            id: id
        })
    }

    async save(schedule: DeepPartial<Schedule>) {
        return await this.scheduleRepo.save(schedule);
    }

    async delete(id: number) {
        return await this.scheduleRepo.delete(id);
    }

} 