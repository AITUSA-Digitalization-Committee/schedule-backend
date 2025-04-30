import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";
import { Group } from "./models/group";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Injectable()
export class GroupService {

    constructor(
        @InjectRepository(Group)
        private groupRepo: Repository<Group>,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) { }

    async findByName(group_name: string) {

        const cached = await this.cacheManager.get<Group>(`group:${group_name}`);
        if (cached) {
            return cached;
        }

        const group = await this.groupRepo.findOneBy({
            name: group_name
        });

        if (group) {
            await this.cacheManager.set(`group:${group_name}`, group, 180 * 1000);
        }

        return group;
    }

    async findById(id: number) {

        const cached = await this.cacheManager.get<Group>(`group:${id}`);
        if (cached) {
            return cached;
        }

        const group = await this.groupRepo.findOneBy({
            id: id
        })

        if (group) {
            await this.cacheManager.set(`group:${id}`, group, 180 * 1000);
        }

        return group;
    }

    async save(group: DeepPartial<Group>) {
        await this.cacheManager.del(`group:${group.id}`);
        await this.cacheManager.del(`group:${group.name}`);
        return await this.groupRepo.save(group);
    }

    async delete(id: number) {
        await this.cacheManager.del(`group:${id}`);
        return await this.groupRepo.delete(id);
    }

} 