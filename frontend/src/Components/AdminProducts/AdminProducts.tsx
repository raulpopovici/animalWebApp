import axios from "axios";
import AdminTable from "../AdminTable/AdminProductsTable";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const AdminUsers = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data: users, refetch } = useQuery(
    ["users"],
    async () => {
      const response = await axios.get("/getAllUsers", {
        params: { pageNumber: pageNumber },
      });
      return response.data;
    },
    {
      initialData: [],
    }
  );

  useEffect(() => {
    refetch();
  }, [pageNumber]);

  const changePageNumber = (newPageNumber: number) => {
    console.log("newPageNumber", newPageNumber);
    setPageNumber(newPageNumber);
  };
  return (
    <div style={{ height: "100vh" }}>
      <AdminTable
        rows={users}
        pageNumber={pageNumber}
        changePageNumber={(page) => changePageNumber(page)}
      />
    </div>
  );
};

export default AdminUsers;
