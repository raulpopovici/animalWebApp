import * as React from "react";
import Box from "@mui/joy/Box";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import IconButton from "@mui/joy/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { orderRows, ordersTablehead } from "./tableHead";

const tableHeadCells = ordersTablehead;

const TableHead = () => {
  return (
    <thead>
      <tr>
        <th></th>
        {tableHeadCells.map((headCell) => {
          return <th key={headCell.id}>{headCell.label}</th>;
        })}
      </tr>
    </thead>
  );
};

const EnhancedTableToolbar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        py: 1,
        pl: { sm: 2 },
        borderTopLeftRadius: "var(--unstable_actionRadius)",
        borderTopRightRadius: "var(--unstable_actionRadius)",
      }}
    >
      <Typography
        level="h6"
        sx={{ flex: "1 1 100%", fontFamily: "Open Sans, sans-serif" }}
        id="tableTitle"
        component="div"
      >
        Orders
      </Typography>
    </Box>
  );
};

export const AdminTable = ({
  rows,
  pageNumber,
  changePageNumber,
}: {
  rows: orderRows[];
  pageNumber: number;
  changePageNumber: (newPageNumber: number) => void;
}) => {
  const handlePageChange = (newPage: number) => {
    console.log("newPage", newPage);
    changePageNumber(newPage);
  };
  return (
    <Sheet
      variant="outlined"
      sx={{
        width: "100%",
        boxShadow: "sm",
        borderRadius: "sm",
        fontFamily: "Open Sans, sans-serif",
      }}
    >
      <EnhancedTableToolbar />
      <Table
        aria-labelledby="tableTitle"
        hoverRow
        sx={{
          "--TableCell-headBackground": "transparent",
          "--TableCell-selectedBackground": (theme) =>
            theme.vars.palette.info.softBg,
          "& thead th:nth-child(1)": {
            width: "40px",
          },
          "& thead th:nth-child(2)": {
            width: "30%",
          },
          "& tr > *:nth-child(n+3)": { textAlign: "right" },
        }}
      >
        <TableHead />
        <tbody>
          {rows.map((row, index) => {
            return (
              <tr>
                <th scope="row"></th>
                <td scope="row">{row.orderID}</td>
                <td>{row.Subtotal}</td>
                <td>{row.Total}</td>
                <td>{row.CreatedAt}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  justifyContent: "flex-end",
                }}
              >
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton
                    size="sm"
                    color="neutral"
                    variant="outlined"
                    onClick={() =>
                      changePageNumber(pageNumber - 1 > 0 ? pageNumber - 1 : 1)
                    }
                    sx={{ bgcolor: "background.surface" }}
                  >
                    <KeyboardArrowLeftIcon />
                  </IconButton>
                  <IconButton
                    size="sm"
                    color="neutral"
                    variant="outlined"
                    onClick={() => changePageNumber(pageNumber + 1)}
                    sx={{ bgcolor: "background.surface" }}
                  >
                    <KeyboardArrowRightIcon />
                  </IconButton>
                </Box>
              </Box>
            </td>
          </tr>
        </tfoot>
      </Table>
    </Sheet>
  );
};

export default AdminTable;
