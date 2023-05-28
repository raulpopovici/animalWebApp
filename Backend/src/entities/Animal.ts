import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import User from "./User";

@Entity()
export class Animal {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column()
  breed: string;

  @Column({ nullable: false })
  age: number;

  @Column({ nullable: false })
  animalType: string;

  @Column({ nullable: false })
  sex: string;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    default: 0,
    nullable: false,
  })
  weight: number;

  @Column()
  details: string;

  @Column({ nullable: false })
  image1: string;

  @Column()
  image2: string;

  @Column()
  image3: string;

  @Column()
  forAdoption: boolean;

  @ManyToOne(() => User, (user) => user.animals)
  user: User;
}
