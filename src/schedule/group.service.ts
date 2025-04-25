import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";
import { Group } from "./models/group";

@Injectable()
export class GroupService {

    constructor(
        @InjectRepository(Group)
        private groupRepo: Repository<Group>,
    ) { }

    async findByName(group_name: string) {
        return await this.groupRepo.findOneBy({
            name: group_name
        });
    }

    async findById(id: number) {
        return await this.groupRepo.findOneBy({
            id: id
        })
    }

    async save(group: DeepPartial<Group>) {
        return await this.groupRepo.save(group);
    }

    async delete(id: number) {
        return await this.groupRepo.delete(id);
    }

} 