import axios from "axios";
import AdminTable from "../AdminTable/AdminProductsTable";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AddProductModal } from "./AddProduct/AddProductModal";
import React from "react";
import {
  AddProductModalState,
  addProductModalReducer,
  initialAddProductModalData,
} from "./AdminProductsReducer";

export const AdminUsers = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data: users, refetch } = useQuery(
    ["users"],
    async () => {
      const response = await axios.get("/getAllProductForAdmin", {
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

  const [open, setOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const [addProductModalData, dispatchAddProductModalReducer] =
    React.useReducer(addProductModalReducer, initialAddProductModalData);
  const handleSaveProduct = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/createProduct",
        {
          name: addProductModalData.name,
          price: addProductModalData.price,
          description: addProductModalData.description,
          quantity: 1,
          image: addProductModalData.image,
          animalType: addProductModalData.animalType,
          animalAge: addProductModalData.animalAge,
          brand: addProductModalData.brand,
          composition: addProductModalData.composition,
          nutritionalAdditives: addProductModalData.nutritionalAdditives,
          analyticalConstituents: addProductModalData.analyticalConstituents,
          productWeight: addProductModalData.productWeight,
          taste: addProductModalData.taste,
        }
      );
      if (response.status === 201) {
        refetch();
        handleCloseModal();
      }
      return response;
    } catch (error: any) {
      if (error.response.data !== undefined) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // dispatchUserReducerData({
        //   type: UserRegisterState.registerErrors,
        //   payload: error.response.data,
        // });
        // console.log(userReducerData.registerErrors);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
      throw error; // Rethrow the error to handle it at a higher level
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <div
        style={{
          color: "#000",
          fontFamily: "Open Sans, sans-serif",
          fontSize: "20px",
          paddingBottom: "20px",
        }}
      >
        The products will appear based on popularity
      </div>
      <AdminTable
        rows={users}
        pageNumber={pageNumber}
        changePageNumber={(page) => changePageNumber(page)}
      />
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 300,
          right: 50,
          bgcolor: "#1e3647",
          "&:hover": { bgcolor: "#4b5e6c" },
        }}
        onClick={() => handleOpenModal()}
      >
        <AddIcon />
      </Fab>
      <AddProductModal
        open={open}
        handleCloseModal={handleCloseModal}
        handleSaveProduct={handleSaveProduct}
        dispatchAddProductModalReducer={dispatchAddProductModalReducer}
      />
    </div>
  );
};

export default AdminUsers;
