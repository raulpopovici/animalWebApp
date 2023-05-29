import * as React from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import styles from "./Profile.module.css";
import Orders from "../../Components/Orders/Orders";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { IOrder, initialOrder } from "../../Interfaces/OrdersPageInterfaces";
import Order from "../../Components/Orders/Order/Order";
import OrderDetails from "../../Components/Orders/OrderDetails/OrderDetails";
import ProfileDetails from "../../Components/ProfileDetails/ProfileDetails";
import { useAuthState } from "../../Context/AuthContext";
import Animals from "../../Components/Animals/Animals";

export const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  let initialIndex = 0;
  if (location.state !== undefined && location.state.index !== undefined) {
    initialIndex = location.state.index;
  }
  let order: IOrder = initialOrder;
  let viewOrder: boolean = false;
  if (
    location.state !== undefined &&
    location.state.index !== undefined &&
    location.state.order !== undefined &&
    location.state.viewOrder !== undefined
  ) {
    order = location.state.order;
    viewOrder = location.state.viewOrder;
  }
  const [index, setIndex] = React.useState(initialIndex);

  const { data: orders, refetch } = useQuery(
    ["orders"],
    async () => {
      const response = await axios.get("/getOrders");
      return response.data;
    },
    {
      initialData: [],
    }
  );

  const user = useAuthState();
  if (!user.isAuth) {
    navigate("/");
  }
  return (
    <div className={styles.pageContainer}>
      <div className={styles.tabContainer}>
        <Tabs
          aria-label="Vertical tabs"
          orientation="vertical"
          sx={{ minWidth: 300, borderRadius: "lg" }}
          onChange={(event, value) => setIndex(value as number)}
          value={index}
        >
          <TabList variant="plain">
            <Tab variant={index === 0 ? "solid" : "plain"} value={0}>
              Profile and Security
            </Tab>
            <Tab variant={index === 1 ? "solid" : "plain"} value={1}>
              Orders
            </Tab>
            <Tab variant={index === 2 ? "solid" : "plain"} value={2}>
              Animals
            </Tab>
          </TabList>
          <TabPanel value={0} sx={{ paddingLeft: 2 }}>
            <ProfileDetails />
          </TabPanel>
          <TabPanel value={1} sx={{ paddingLeft: 2 }}>
            {viewOrder ? (
              <OrderDetails order={order} />
            ) : (
              <Orders orders={orders} />
            )}
          </TabPanel>
          <TabPanel value={2} sx={{ paddingLeft: 2, minHeight: 200 }}>
            <Animals />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
