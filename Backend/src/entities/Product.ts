import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
} from "typeorm";
import Order from "./Order";
import CartProduct from "./CartProduct";
import { OrderProduct } from "./OrderProduct";

@Entity()
export default class Product extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    default: 0,
    nullable: false,
  })
  price: number;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: false })
  animalType: string;

  @Column({ nullable: false })
  animalAge: string;

  @Column({ nullable: false })
  brand: string;

  @Column({ nullable: false })
  composition: string;

  @Column({ nullable: false })
  nutritionalAdditives: string;

  @Column({ nullable: false })
  analyticalConstituents: string;

  @Column({ nullable: false })
  productWeight: number;

  @Column({ nullable: false })
  taste: string;

  @OneToMany(() => CartProduct, (cp) => cp.product)
  cartConnect: Promise<CartProduct[]>;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
  orderProducts: OrderProduct[];
}
