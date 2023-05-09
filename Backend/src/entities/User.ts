import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  BeforeInsert,
} from "typeorm";
import { IsEmail, Length } from "class-validator";
import bcrypt = require("bcrypt");
import Order from "./Order";

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @IsEmail(undefined, { message: "Must be a valid email" })
  @Length(1, 255, { message: "Must not be empty" })
  @Column({ unique: true })
  email: string;

  @Length(6, 24, { message: "Must be at least 6 characters long" })
  @Column()
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @BeforeInsert()
  async encryptPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  @Column({ nullable: true })
  cartId: string;
}
