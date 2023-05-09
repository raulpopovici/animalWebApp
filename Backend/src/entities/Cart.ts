import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import CartProduct from "./CartProduct";
import Product from "./Product";
import User from "./User";

@Entity("cart")
export default class Cart extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => User, (user) => user)
  @JoinColumn()
  user: User;

  @OneToMany(() => CartProduct, (cp) => cp.cart)
  productConnect: Promise<CartProduct[]>;
}
