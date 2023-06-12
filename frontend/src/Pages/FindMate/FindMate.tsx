import React, { useEffect, useState } from "react";
import styles from "./FindMate.module.css";
import SelectPetForMate from "../../Components/Animals/SelectPetForMate/SelectPetForMate";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress, Tooltip } from "@mui/joy";
import { useAuthState } from "../../Context/AuthContext";
import { Animal } from "../../Interfaces/AnimalPageInterface";
import { animalModal } from "../Adopt/Adopt";
import { AnimalCard } from "../../Components/Animals/AnimalCard/AnimalCard";
import { Pagination } from "@mui/material";
import EmptyPage from "../../Components/EmptyPage/EmptyPage";
import ViewAnimalModal from "../../Components/Animals/ViewAnimalModal/ViewAnimalModal";

const FindMate = () => {
  const [openCircularProgress, setOpenCircularProgress] = useState(false);
  const animalInitialState = {
    id: "",
    name: "",
    breed: "",
    age: 0,
    animalType: "",
    sex: "",
    weight: 0,
    details: "",
    image1: "",
    image2: "",
    image3: "",
    forAdoption: false,
    user: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      city: "",
      country: "",
    },
  };

  const arrayAnimalInitialState = [animalInitialState];
  const [animals, setAnimals] = useState<Animal[]>(arrayAnimalInitialState);
  const [showAnimals, setShowAnimals] = useState(false);

  const user = useAuthState();

  const { data: animalsNames, refetch } = useQuery(
    ["animalsNames"],
    async () => {
      const response = await axios.get("/getAnimalsByUserId", {
        params: {
          utilityType: "findMate",
        },
      });
      return response.data;
    },
    {
      initialData: [],
    }
  );

  const fetchPossibleMatches = async (id: string) => {
    setOpenCircularProgress(true);

    try {
      const response = await axios.get("/getPossibleMatches", {
        params: {
          animalId: id,
        },
      });

      if (response.data) {
        setAnimals(response.data);
      } else {
        console.log("no possible matches");
      }
    } catch {
      console.log("error fetching possible matches");
    }

    const timer = setTimeout(() => {
      setOpenCircularProgress(false);
      setShowAnimals(true);
    }, 3000);
  };

  const [open, setOpen] = useState<animalModal>({
    open: false,
    animal: animalInitialState,
  });

  const openModal = (animal: Animal) => {
    setOpen({ open: true, animal: animal });
  };

  const onCloseModal = () => {
    setOpen({ open: false, animal: animalInitialState });
  };
  return (
    <div className={styles.pageContainer}>
      <div className={styles.middlePage}>
        <div style={{ fontSize: "20px" }}>
          Choose one of your pets and we will find suitable matches for it
        </div>
        <div style={{ paddingTop: "30px" }}>
          {user.isAuth ? (
            <SelectPetForMate
              animals={animalsNames}
              findMatches={fetchPossibleMatches}
            />
          ) : (
            <Tooltip
              title="You need to be logged in to use this utility"
              variant="soft"
            >
              <div>
                <SelectPetForMate
                  animals={animalsNames}
                  findMatches={fetchPossibleMatches}
                  disabled={true}
                />
              </div>
            </Tooltip>
          )}
        </div>
        <div style={{ paddingTop: "40px" }}>
          {openCircularProgress ? (
            <CircularProgress
              variant="plain"
              size="lg"
              sx={{ color: "#1e3647" }}
              thickness={2}
            />
          ) : (
            <div>
              {showAnimals ? (
                <div className={styles.animalsContainer}>
                  {animals?.map((animal: Animal) => (
                    <div onClick={() => openModal(animal)}>
                      <AnimalCard key={animal.id} animal={animal} />
                    </div>
                  ))}
                </div>
              ) : (
                <></>
              )}

              {animals.length === 0 ? (
                <EmptyPage text="No possible matches for this pet" />
              ) : null}
              <ViewAnimalModal modalState={open} onClose={onCloseModal} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindMate;
