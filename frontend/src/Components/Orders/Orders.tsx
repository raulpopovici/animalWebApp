import { IOrder } from "../../Interfaces/OrdersPageInterfaces";
import Order from "./Order/Order";
import styles from "./Orders.module.css";
export const Orders = ({ orders }: { orders: IOrder[] }) => {
  return (
    <div className={styles.ordersPageContainer}>
      <h1 className={styles.ordersHeader}>Your orders</h1>
      {orders.map((order) => (
        <Order order={order} />
      ))}
    </div>
  );
};

export default Orders;
