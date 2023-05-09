import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Product from "./Product";
import Order from "./Order";

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  quantity: number;

  @ManyToOne(() => Order, (order) => order.orderProducts)
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderProducts)
  product: Product;
}
