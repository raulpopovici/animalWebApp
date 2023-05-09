import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Order from "./Order";

@Entity()
export default class ShippingInfo extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  address1: string;

  @Column({ nullable: false })
  address2: string;

  @Column({ nullable: false })
  postalCode: string;

  @Column({ nullable: false })
  phoneNumber: string;

  @Column({ nullable: false })
  country: string;

  @OneToOne(() => Order, (order) => order.shipping)
  order: Order;
}
