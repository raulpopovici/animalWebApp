import { useNavigate } from "react-router-dom";
import { IProduct } from "../../../Interfaces/FoodPageInterfaces";
import {
  IOrder,
  IOrderProduct,
} from "../../../Interfaces/OrdersPageInterfaces";
import { convertDate, createDeliveryDate } from "../../../Utils/functions";
import styles from "../Orders.module.css";
export const Order = ({ order }: { order: IOrder }) => {
  const navigate = useNavigate();
  const handleClick = (page: string, index: number) => {
    navigate(page, {
      state: { index: index, order: order, viewOrder: true },
    });
  };
  return (
    <section
      className={styles.sectionStyle}
      onClick={() => handleClick("/profile", 1)}
    >
      <div className={styles.orderContainer}>
        <div className={styles.orderContainer1}>
          <div className={styles.orderContainer2}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  lineHeight: "1.29",
                  color: "#000",
                }}
              >
                Transaction date
              </span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  lineHeight: "1.29",
                  color: "rgb(155, 155, 155)",
                }}
              >
                {convertDate(order.createdAt)}
              </span>
            </div>
            <hr className={styles.hrStyle} />
            <div className={styles.orderBottomPartContainer}>
              <div className={styles.orderBottomPartContainer1}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "700",
                      lineHeight: "1.29",
                      color: "#000",
                    }}
                  >
                    Delivery date
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "700",
                      lineHeight: "1.29",
                      color: "rgb(155, 155, 155)",
                    }}
                  >
                    {createDeliveryDate(order.createdAt, 4)} -{" "}
                    {createDeliveryDate(order.createdAt, 10)}
                  </span>
                </div>
              </div>
              <div className={styles.orderBottomPartContainer2}>
                <div className={styles.imagesContainer}>
                  {order.orderProducts.map((product: IOrderProduct, index) => {
                    if (index < 2) {
                      return (
                        <div key={index} className={styles.imageContainer}>
                          <div className={styles.imageContainer1}>
                            <img
                              className={styles.imageStyle}
                              src={product.product.image}
                            />
                          </div>
                        </div>
                      );
                    } else {
                      return null; // don't display any more elements
                    }
                  })}
                  {order.orderProducts.length > 2 ? (
                    <div className={styles.imageOverflow}>
                      <span className={styles.spanOverflow}>
                        +{order.orderProducts.length - 2}
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </section>
  );
};

export default Order;
