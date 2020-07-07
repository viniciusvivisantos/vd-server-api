import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, RelationCount, RelationId } from 'typeorm';


@Entity()
export class User {

  @PrimaryGeneratedColumn("uuid", { name: "userUniqueId" })
  userUniqueId: string;

  @Column({ name: "username" })
  username: string;

  @Column({ name: "password" })
  password: string;

  @Column({ name: "userEmail", unique: true })
  userEmail: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt?: Date;

}