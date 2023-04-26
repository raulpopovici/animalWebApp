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

import ClearIcon from "@mui/icons-material/Clear";
import { width } from "@mui/system";
function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const Cart = () => {
  const [productQuantity, setProductQuantity] = useState(1);
  const changeQuantity = (isIncrease: boolean) => {
    if (!isIncrease) {
      if (productQuantity - 1 !== 0) {
        setProductQuantity(productQuantity - 1);
      }
    } else {
      setProductQuantity(productQuantity + 1);
    }
  };
  return (
    <div className={styles.pageContainer}>
      <div className={styles.firstRowPageContainer}>Your Cart</div>
      <div className={styles.secondRowPageContainer}>
        <div className={styles.middlePageColumn1}>
          <TableContainer>
            <Table sx={{ minWidth: "250px" }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ color: "#b3b3b3" }}>
                  <TableCell>
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
                {rows.map((row) => (
                  <TableRow key={row.name} sx={{ height: "100px" }}>
                    <TableCell component="th" scope="row">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={purina}
                          style={{ height: "80px", width: "80px" }}
                        ></img>
                        {row.name}
                      </div>
                    </TableCell>
                    <TableCell align="center">sdd</TableCell>
                    <TableCell align="center">
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <div className={styles.incrementNrOfProducts}>
                          <RemoveIcon
                            sx={{
                              "&:hover": {
                                cursor: "pointer",
                              },
                              color: "#000",
                              height: "18px",
                              width: "18px",
                            }}
                            onClick={() => changeQuantity(false)}
                          />
                          <div
                            style={{
                              color: "#000",
                              fontFamily: "Open Sans, sans-serif",
                              fontSize: "15px",
                            }}
                          >
                            {productQuantity}
                          </div>

                          <AddIcon
                            sx={{
                              "&:hover": {
                                cursor: "pointer",
                              },
                              color: "#000",
                              height: "18px",
                              width: "18px",
                            }}
                            fontSize="medium"
                            onClick={() => changeQuantity(true)}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell align="center">{row.carbs}</TableCell>
                    <TableCell>
                      <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <button className={styles.tableButton}>
                          <ClearIcon sx={{ width: "14px", height: "14px" }} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className={styles.middlePageColumn2}>sss</div>
      </div>
    </div>
  );
};

export default Cart;
