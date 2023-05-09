import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import Product from "./Product";
import ShippingInfo from "./ShippingInfo";
import CartProduct from "./CartProduct";
import { OrderProduct } from "./OrderProduct";

@Entity()
export default class Order extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  userId: string;

  @Column({ nullable: false })
  customerId: string;

  @Column({ nullable: false })
  paymentId: string;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    default: 0,
    nullable: false,
  })
  subtotal: number;
  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    default: 0,
    nullable: false,
  })
  total: number;

  @Column({ nullable: false, default: "pending" })
  delivery_status: string;

  @Column({ nullable: false })
  payment_status: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, {
    cascade: true,
  })
  orderProducts: OrderProduct[];

  @OneToOne(() => ShippingInfo, (shipping) => shipping.order)
  @JoinColumn()
  shipping: ShippingInfo;
}
