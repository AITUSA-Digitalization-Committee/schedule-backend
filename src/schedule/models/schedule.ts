import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Group } from "./group";

@Entity()
export class Schedule {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Group, (group) => group.schedules, { onDelete: "CASCADE" })
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @Column()
  day: string;

  @Column({ type: "time" })
  starts: string;

  @Column({ type: "time" })
  ends: string;

  @Column()
  subject: string;

  @Column()
  classroom: string;

  @Column()
  type: string;

  @Column()
  lecturer: string;

}
