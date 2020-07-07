import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class History {

  @PrimaryGeneratedColumn("increment", { name: "history_id" })
  historyId: number;

  @Column({ name: "user_id" })
  userId: string;

  @Column({ name: "motive_id" })
  motiveId: string;

  @Column({ name: "date" })
  date: Date;

  @CreateDateColumn({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt?: Date;
}