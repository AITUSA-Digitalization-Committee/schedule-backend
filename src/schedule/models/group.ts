import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Schedule } from "./schedule";

@Entity("groups")
export class Group {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Schedule, (schedule) => schedule.group, { eager: true})
  schedules: Schedule[];

}
