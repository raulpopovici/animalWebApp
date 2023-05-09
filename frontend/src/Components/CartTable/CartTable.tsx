import * as React from "react";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import styles from "../../Pages/Cart/Cart.module.css";
import Chip from "@mui/joy/Chip";
import ClearIcon from "@mui/icons-material/Clear";
import Tooltip from "@mui/joy/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

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
  createData("1", 159, 6.0, 24, 4.0),
  createData("2", 237, 9.0, 37, 4.3),
  createData("3", 262, 16.0, 24, 6.0),
  createData("4", 305, 3.7, 67, 4.3),
  createData("5", 356, 16.0, 49, 3.9),
];

export const TableSortAndSelection = () => {
  const [productQuantity, setProductQuantity] = React.useState(1);
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
    <div>
      <Sheet
        sx={{
          height: "1fr",
          overflow: "auto",
          variant: "outlined",
          borderBottom: "1px solid black",
          marginBottom: "50px",
          minWidth: "250px",
        }}
      >
        <Table
          aria-label="table with sticky header"
          stickyHeader
          sx={{ minWidth: "250px" }}
        >
          <thead>
            <tr>
              <th style={{ width: "40%", borderColor: "#000", borderWidth: 1 }}>
                <div className={styles.tableHeaderText}>PRODUCT</div>
              </th>
              <th style={{ borderColor: "#000", borderWidth: 1 }}>
                <div className={styles.tableHeaderText}>PRICE</div>
              </th>
              <th style={{ borderColor: "#000", borderWidth: 1 }}>
                <div className={styles.tableHeaderText}>QUANTITY</div>
              </th>
              <th style={{ borderColor: "#000", borderWidth: 1 }}>
                <div className={styles.tableHeaderText}>TOTAL</div>
              </th>
              <th
                aria-label="last"
                style={{ width: "100px", borderColor: "#000", borderWidth: 1 }}
              />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name} style={{ height: "150px" }}>
                <td>{row.calories}</td>
                <td>{row.fat}</td>

                <td>
                  <Chip
                    variant="outlined"
                    color="neutral"
                    size="lg"
                    startDecorator={
                      <RemoveIcon
                        className={styles.changeQty}
                        onClick={() => console.log("sadd")}
                      />
                    }
                    endDecorator={<AddIcon />}
                  >
                    {productQuantity}
                  </Chip>
                </td>

                <td>{row.protein}</td>
                <td>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Tooltip title="Remove" variant="soft">
                      <button className={styles.tableButton}>
                        <ClearIcon sx={{ width: "20px", height: "20px" }} />
                      </button>
                    </Tooltip>
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </div>
  );
};
