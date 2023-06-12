import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from "./Animals.module.css";
import { AddAnimalModal } from "./AddAnimalModal/AddAnimalModal";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ViewAnimal } from "./ViewAnimal/ViewAnimal";
import { Animal } from "../../Interfaces/AnimalPageInterface";
import {
  AddAnimalModalState,
  addAnimalModalReducer,
  initialAddAnimalModalData,
} from "./AnimalsReducer";
import EmptyPage from "../EmptyPage/EmptyPage";
export const Animals = () => {
  const [open, setOpen] = useState<boolean>(false);

  const [addAnimalModalData, dispatchAddAnimalModalReducer] = React.useReducer(
    addAnimalModalReducer,
    initialAddAnimalModalData
  );

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const { data: animals, refetch } = useQuery(
    ["animals"],
    async () => {
      const response = await axios.get("/getAnimalsByUserId");
      return response.data;
    },
    {
      initialData: [],
    }
  );

  const deleteAnimal = async (animalId: string) => {
    try {
      const response = await axios.delete("/deleteAnimal", {
        data: { animalId: animalId },
      });
      if (response.status === 204) {
        refetch();
      }
      console.log(response);
    } catch {
      console.log("error deletint animal");
    }
  };

  const handleSaveAnimal = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/createAnimal",
        {
          name: addAnimalModalData.name,
          breed: addAnimalModalData.breed,
          age: addAnimalModalData.age,
          animalType: addAnimalModalData.animalType,
          sex: addAnimalModalData.sex,
          weight: addAnimalModalData.weight,
          details: addAnimalModalData.details,
          image1: addAnimalModalData.image1,
          image2: addAnimalModalData.image2,
          image3: addAnimalModalData.image3,
          forAdoption: addAnimalModalData.forAdoption,
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
    <div className={styles.containerAnimals}>
      <div className={styles.containerOrderDetailsLeft}>
        <h1 className={styles.animalsPageHeader}>Your animals</h1>
        {animals.length === 0 ? (
          <EmptyPage text="You have no animals!" />
        ) : (
          <></>
        )}
        {animals.map((animal: Animal) => (
          <ViewAnimal key={animal.id} animal={animal} onDelete={deleteAnimal} />
        ))}
      </div>
      <div className={styles.containerOrderDetailsRight}>
        <Fab
          color="primary"
          aria-label="add"
          sx={{
            position: "fixed",
            bottom: 100,
            right: 50,
            bgcolor: "#1e3647",
            "&:hover": { bgcolor: "#4b5e6c" },
          }}
          onClick={() => handleOpenModal()}
        >
          <AddIcon />
        </Fab>
      </div>
      <AddAnimalModal
        open={open}
        handleCloseModal={handleCloseModal}
        handleSaveAnimal={handleSaveAnimal}
        dispatchAddAnimalModalReducer={dispatchAddAnimalModalReducer}
      />
    </div>
  );
};

export default Animals;
