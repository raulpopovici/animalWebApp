import axios from "axios";
import React, { useState } from "react";
import styles from "./PayButton.module.css";
import { ICartProduct } from "../../Interfaces/CartPageInterfaces";
import { useAuthState } from "../../Context/AuthContext";
import { Tooltip } from "@mui/joy";

export const PayButton = ({ data }: { data: ICartProduct[] }) => {
  const user = useAuthState();
  const handleCheckout = async () => {
    if (user.isAuth === false) {
      console.log("user is not authenticated");
    } else {
      axios
        .post("create-checkout-session", {
          data,
          userId: user.user.id,
        })
        .then((res) => {
          if (res.data.url) {
            window.location.href = res.data.url;
          }
        })
        .catch((err) => console.log(err.message));
    }
  };

  return (
    <div>
      {user.isAuth ? (
        <button
          onClick={() => handleCheckout()}
          className={styles.checkoutButton}
        >
          Checkout
        </button>
      ) : (
        <Tooltip
          title="Need to log in in order to proceed to checkout"
          placement="top-start"
        >
          <button className={styles.disabledButton}>Checkout</button>
        </Tooltip>
      )}
    </div>
  );
};
