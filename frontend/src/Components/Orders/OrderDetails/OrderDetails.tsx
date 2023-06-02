import { IOrder } from "../../../Interfaces/OrdersPageInterfaces";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import styles from "./OrderDetails.module.css";
import { convertDate, createDeliveryDate } from "../../../Utils/functions";
export const OrderDetails = ({ order }: { order: IOrder }) => {
  return (
    <div className={styles.containerOrderDetails}>
      <div className={styles.containerOrderDetailsLeft}>
        <h1 className={styles.ordersHeader}>Order Details</h1>
        <section className={styles.sectionOrder}>
          <div className={styles.datesContainer}>
            <div>
              <div className={styles.headerText}>Transaction Date</div>
              <div className={styles.addressDetailsText}>
                {convertDate(order.createdAt)}
              </div>
            </div>
            <div>
              <div className={styles.headerText}>Delivery Date</div>
              <div className={styles.addressDetailsText}>
                {createDeliveryDate(order.createdAt, 4)} -{" "}
                {createDeliveryDate(order.createdAt, 10)}
              </div>
            </div>
          </div>
          <hr className={styles.hrStyle} />
          <div className={styles.datesContainer}>
            <div>
              <div className={styles.headerText}>Address Details</div>
              <div className={styles.addressDetailsText}>
                {order.shipping.name}
              </div>
              <div className={styles.addressDetailsText}>
                {order.shipping.email}
              </div>
              <div className={styles.addressDetailsText}>
                {order.shipping.address1}
              </div>
              <div className={styles.addressDetailsText}>
                {order.shipping.city}
              </div>
              <div className={styles.addressDetailsText}>
                {order.shipping.country}
              </div>
              <div className={styles.addressDetailsText}>
                {order.shipping.postalCode}
              </div>
            </div>
            <div className={styles.totalsStyle}>
              <div className={styles.orderPriceSubtotal}>
                <div className={styles.orderPriceSubtotalAndText}>Subtotal</div>
                <div className={styles.orderPriceSubtotalAndShipping}>
                  ${order.subtotal}
                </div>
              </div>
              <div className={styles.orderPriceSubtotal}>
                <div className={styles.orderPriceSubtotalAndText}>Shipping</div>
                <div className={styles.orderPriceSubtotalAndShipping}>
                  $0.00
                </div>
              </div>

              <div className={styles.orderPricetotal}>
                <div className={styles.orderPriceTotalAndText}>Total</div>
                <div className={styles.orderPriceTotalAndShipping}>
                  ${order.total}
                </div>
              </div>
            </div>
          </div>
          <hr className={styles.hrStyle} />
          <div className={styles.productSection}>
            {order.orderProducts.map((product) => (
              <div className={styles.productContainer}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <img
                    src={product.product.image}
                    style={{ height: "100px", width: "100px" }}
                  ></img>
                  <div className={styles.productDetails}>
                    <div className={styles.productName}>
                      {product.product.name}
                    </div>
                    <div className={styles.productName}>
                      {product.product.brand}
                    </div>
                    <div className={styles.productName}>
                      {product.product.productWeight}g
                    </div>
                  </div>
                </div>
                <div className={styles.priceStyle}>
                  ${product.product.price}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className={styles.containerOrderDetailsRight}></div>
    </div>
  );
};

export default OrderDetails;
