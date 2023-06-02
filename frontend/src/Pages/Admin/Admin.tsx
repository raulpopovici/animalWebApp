import { useEffect } from "react";
import { useAuthState } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import React from "react";
import styles from "./Admin.module.css";
import AdminUsers from "../../Components/AdminUsers/AdminUsers";
import AdminProducts from "../../Components/AdminProducts/AdminProducts";
import AdminOrders from "../../Components/AdminOrders/AdminOrders";
import AdminAnimals from "../../Components/AdminAnimals/AdminAnimals";

export const Admin = () => {
  const user = useAuthState();
  const navigate = useNavigate();
  console.log(user);
  useEffect(() => {
    if (!user.isAuth) {
      console.log("user is not auth");
      navigate("/");
    } else if (!user.user.isAdmin) {
      console.log("user is not admin");
      navigate("/");
    }
  }, [user.isAuth, user.user.isAdmin]);

  const [index, setIndex] = React.useState(0);
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
              Users
            </Tab>
            <Tab variant={index === 1 ? "solid" : "plain"} value={1}>
              Products
            </Tab>
            <Tab variant={index === 2 ? "solid" : "plain"} value={2}>
              Orders
            </Tab>
            <Tab variant={index === 3 ? "solid" : "plain"} value={3}>
              Animals
            </Tab>
          </TabList>
          <TabPanel value={0} sx={{ paddingLeft: 2 }}>
            <AdminUsers />
          </TabPanel>
          <TabPanel value={1} sx={{ paddingLeft: 2 }}>
            <AdminProducts />
          </TabPanel>
          <TabPanel value={2} sx={{ paddingLeft: 2, minHeight: 200 }}>
            <AdminOrders />
          </TabPanel>
          <TabPanel value={3} sx={{ paddingLeft: 2, minHeight: 200 }}>
            <AdminAnimals />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
