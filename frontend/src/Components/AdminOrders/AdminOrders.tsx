import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { AdminTable } from "../AdminTable/AdminOrdersTable";
import styles from "./AdminOrders.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export const AdminOrders = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data: orders, refetch } = useQuery(
    ["orders"],
    async () => {
      const response = await axios.get("/getAllOrdersAdmin", {
        params: { pageNumber: pageNumber },
      });
      return response.data;
    },
    {
      initialData: [],
    }
  );

  const { data: ordersDates, refetch: refetch2 } = useQuery(
    ["ordersDates"],
    async () => {
      const response = await axios.get("/getOrderTotalPerDay");
      return response.data;
    },
    {
      initialData: [],
    }
  );
  useEffect(() => {
    console.log(ordersDates);
    refetch();
  }, [pageNumber]);

  const changePageNumber = (newPageNumber: number) => {
    console.log("newPageNumber", newPageNumber);
    setPageNumber(newPageNumber);
  };
  return (
    <div style={{ height: "1fr" }}>
      <AdminTable
        rows={orders}
        pageNumber={pageNumber}
        changePageNumber={(page) => changePageNumber(page)}
      />
      <div className={styles.textStyle}>
        The chart below illustrates the cumulative expenditure for each day with
        an order
      </div>
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={ordersDates}
            margin={{
              top: 30,
              right: 30,
              left: 30,
              bottom: 30,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="createdAt"
              tick={{ fontSize: 12 }}
              tickFormatter={(tick) =>
                new Date(tick).toLocaleDateString("en-GB", {
                  month: "numeric",
                  day: "numeric",
                  year: "numeric",
                })
              }
            />
            <YAxis dataKey="Total" />
            <Tooltip />
            <Line
              type="linear"
              dataKey="Total"
              stroke="#1e3647"
              strokeWidth={5}
              dot={false}
              animationDuration={1000}
              animationEasing="ease-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminOrders;
