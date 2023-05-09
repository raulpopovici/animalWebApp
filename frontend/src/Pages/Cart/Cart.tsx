import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import styles from "./Cart.module.css";
import Paper from "@mui/material/Paper";
import purina from "../../Assets/purina.png";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import sleepyDogg from "../../Assets/sleepyDogg.jpeg";

import ClearIcon from "@mui/icons-material/Clear";
import { width } from "@mui/system";
import { TableSortAndSelection } from "../../Components/CartTable/CartTable";
import Box from "@mui/joy/Box";
import { Button, Sheet, Tooltip } from "@mui/joy";
import { ICartProduct } from "../../Interfaces/CartPageInterfaces";
import { IProduct } from "../../Interfaces/FoodPageInterfaces";
import { PayButton } from "../../Components/PayButton/PayButton";
import { useAuthState } from "../../context/AuthContext";
import { handleAddToCart } from "./CartController";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const Cart = ({
  data,
  toggleCartState,
}: {
  data: ICartProduct[];
  toggleCartState: () => void;
}) => {
  const user = useAuthState();
  const totalPrice = data.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.product.price * currentValue.quantity,
    0
  );

  const changeQuantity = async (
    isIncrease: boolean,
    cartItem: ICartProduct
  ) => {
    handleAddToCart(
      toggleCartState,
      cartItem.product,
      isIncrease ? 1 : -1,
      false,
      user.user.cartId,
      user.isAuth
    );
  };

  const handleRemove = async (cartItem: ICartProduct) => {
    await handleAddToCart(
      toggleCartState,
      cartItem.product,
      cartItem.quantity,
      true,
      user.user.cartId,
      user.isAuth
    );
  };
  const navigate = useNavigate();
  return (
    <div className={styles.pageContainer}>
      <div className={styles.firstRowPageContainer}>Your Cart</div>
      <div className={styles.secondRowPageContainer}>
        <div className={styles.middlePageColumn1}>
          <TableContainer sx={{ marginBottom: "100px" }}>
            <Table sx={{ minWidth: "250px" }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ color: "#b3b3b3" }}>
                  <TableCell align="left">
                    <div className={styles.tableHeaderText}>PRODUCT</div>
                  </TableCell>
                  <TableCell align="center">
                    <div className={styles.tableHeaderText}>PRICE</div>
                  </TableCell>
                  <TableCell align="center">
                    <div className={styles.tableHeaderText}>QUANTITY</div>
                  </TableCell>
                  <TableCell align="center">
                    <div className={styles.tableHeaderText}>TOTAL</div>
                  </TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((cartItem) => (
                  <TableRow
                    key={cartItem.product.name}
                    className={styles.tableRow}
                    onClick={() =>
                      navigate(
                        `/food/${cartItem.product.name.replaceAll(" ", "-")}`,
                        {
                          state: { product: cartItem.product },
                        }
                      )
                    }
                  >
                    <TableCell component="th" scope="row">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={cartItem.product.image}
                          style={{ height: "80px", width: "80px" }}
                        ></img>
                        {cartItem.product.name}
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      ${cartItem.product.price}
                    </TableCell>
                    <TableCell align="center">
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <div className={styles.incrementNrOfProducts}>
                          <RemoveIcon
                            className={styles.changeQty}
                            onClick={() => changeQuantity(false, cartItem)}
                          />
                          <div
                            style={{
                              color: "#000",
                              fontFamily: "Open Sans, sans-serif",
                              fontSize: "15px",
                            }}
                          >
                            {cartItem.quantity}
                          </div>

                          <AddIcon
                            className={styles.changeQty}
                            onClick={() => changeQuantity(true, cartItem)}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      ${(cartItem.product.price * cartItem.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Tooltip title="Remove" variant="soft">
                            <button
                              className={styles.tableButton}
                              onClick={() => handleRemove(cartItem)}
                            >
                              <ClearIcon
                                sx={{ width: "20px", height: "20px" }}
                              />
                            </button>
                          </Tooltip>
                        </Box>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* <TableSortAndSelection /> */}
          {data.length === 0 ? (
            <div
              style={{
                display: "flex",
                alignSelf: "center",
                justifySelf: "center",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={sleepyDogg}
                style={{ height: "300px", width: "300px", marginTop: "-100px" }}
              ></img>
              <div
                style={{
                  color: "#000",
                  fontFamily: "Open Sans, sans-serif",
                  fontSize: "20px",
                  marginTop: "-80px",
                }}
              >
                Your cart is currently empty!
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div>
          <Sheet className={styles.middlePageColumn2}>
            <div className={styles.middlePageColumn2Rows}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    marginLeft: "26px",
                    fontFamily: "Open Sans, sans-serif",
                    fontWeight: "700",
                    fontSize: "20px",
                    lineHeight: "20px",
                  }}
                >
                  Subtotal
                </div>
              </div>

              <div
                style={{
                  marginRight: "26px",
                  fontFamily: "Open Sans, sans-serif",
                  fontSize: "20px",
                  lineHeight: "20px",
                }}
              >
                ${totalPrice.toFixed(2)}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                style={{
                  fontFamily: "Open Sans, sans-serif",
                  fontSize: "15px",
                  fontWeight: "500",
                  color: "#727272",
                }}
              >
                Taxes and shipping calculated at checkout
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <PayButton data={data} />
            </div>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Cart;