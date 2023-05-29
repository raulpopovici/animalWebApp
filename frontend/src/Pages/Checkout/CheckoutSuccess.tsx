import React from "react";
import styles from "./CheckoutSuccess.module.css";
import { Sheet } from "@mui/joy";
import { OrderSuccessCard } from "../../Components/OrderSuccessCard/OrderSuccesCard";
import { useEffect, useState } from "react";
import { useAuthState } from "../../Context/AuthContext";
import axios from "axios";

const CheckoutSuccess = ({
  toggleCartState,
}: {
  toggleCartState: () => void;
}) => {
  const user = useAuthState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/postFromCartToOrders", {
          cartId: user.user.cartId,
        });
        toggleCartState();
      } catch (error) {
        console.log(error);
      }
    };
    if (user.isAuth) {
      fetchData();
    }
  }, [user]);
  return (
    <Sheet
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "500px",
      }}
    >
      <OrderSuccessCard />
    </Sheet>
  );
};
export default CheckoutSuccess;
