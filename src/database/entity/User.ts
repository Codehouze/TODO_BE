import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from "typeorm";
import Todo from "./Todo";

@Entity({ name: "user" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos!: Todo[];

  @CreateDateColumn({
    type: "timestamp",
  })
  public createdAt!: Date;

  @UpdateDateColumn({
    type: "timestamp",
  })
  public updatedAt!: Date;
}

export default User;
