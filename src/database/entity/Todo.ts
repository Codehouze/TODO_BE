import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity,
  OneToMany,
  ManyToOne,
} from "typeorm";
import User from "./User";

@Entity({ name: "todo" })
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ default: false })
  completed!: boolean;

  @Column({ default: false }) 
  isDeleted!: boolean;

  @ManyToOne(() => User, (user) => user.todos)
  user!: User;

  @CreateDateColumn({
    type: "timestamp",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: "timestamp",
  })
  updatedAt!: Date;

  @DeleteDateColumn({
    type: "timestamp",
  })
  deletedAt?: Date;
}

export default Todo;
