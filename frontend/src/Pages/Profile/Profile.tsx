import * as React from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import styles from "./Profile.module.css";
import Orders from "../../Components/Orders/Orders";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

export const Profile = () => {
  const location = useLocation();
  const initialIndex = location.state.index;
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
          <TabPanel sx={{ paddingLeft: 2 }}>Profile and Security</TabPanel>
          <TabPanel value={1} sx={{ p: 2 }}>
            <Orders orders={orders} />
          </TabPanel>
          <TabPanel value={2} sx={{ p: 2, minHeight: 200 }}>
            <b>Third</b> tab panel
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
