import { useEffect, useReducer, useState } from "react";
import TopFilters from "./Filter/TopFilters";
import styles from "./Adopt.module.css";
import { AnimalCard } from "./AnimalCard/AnimalCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Pagination } from "@mui/material";
import { Animal } from "../../Interfaces/AnimalPageInterface";
import ViewAnimalModal from "../../Components/Animals/ViewAnimalModal/ViewAnimalModal";
import { getNumberOfPages } from "./AdoptController";

export interface adoptFilters {
  wantDog: boolean;
  wantCat: boolean;
  wantBird: boolean;
  wantRodent: boolean;
  wantFish: boolean;
  page: number;
}

export interface animalModal {
  open: boolean;
  animal: Animal;
}

const Adopt = () => {
  const [topFilters, setTopFilters] = useState<adoptFilters>({
    wantDog: false,
    wantCat: false,
    wantBird: false,
    wantRodent: false,
    wantFish: false,
    page: 1,
  });

  const { data: animals, refetch } = useQuery(["animals"], async () => {
    const response = await axios.get("/getAdoptionAnimals", {
      params: {
        wantDog: topFilters.wantDog,
        wantCat: topFilters.wantCat,
        wantBird: topFilters.wantBird,
        wantRodent: topFilters.wantRodent,
        wantFish: topFilters.wantFish,
        pageNumber: topFilters.page,
      },
    });
    return response.data;
  });

  const { data: animalsCount, refetch: refetchCount } = useQuery(
    ["animalsCount"],
    async () => {
      const response = await axios.get("/getAdoptionAnimalsCount", {
        params: {
          wantDog: topFilters.wantDog,
          wantCat: topFilters.wantCat,
          wantBird: topFilters.wantBird,
          wantRodent: topFilters.wantRodent,
          wantFish: topFilters.wantFish,
          pageNumber: 1,
        },
      });
      return response.data;
    }
  );

  useEffect(() => {
    refetch();
    refetchCount();
  }, [topFilters, refetch, refetchCount]);

  const handleWantDogChange = (text: string) => {
    switch (text) {
      case "dog":
        setTopFilters((prevFilters) => ({
          ...prevFilters,
          wantDog: !prevFilters.wantDog,
        }));
        break;
      case "cat":
        setTopFilters((prevFilters) => ({
          ...prevFilters,
          wantCat: !prevFilters.wantCat,
        }));
        break;
      case "bird":
        setTopFilters((prevFilters) => ({
          ...prevFilters,
          wantBird: !prevFilters.wantBird,
        }));
        break;
      case "rodent":
        setTopFilters((prevFilters) => ({
          ...prevFilters,
          wantRodent: !prevFilters.wantRodent,
        }));
        break;
      case "fish":
        setTopFilters((prevFilters) => ({
          ...prevFilters,
          wantFish: !prevFilters.wantFish,
        }));
        break;
    }
  };

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
    user: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      city: "",
      country: "",
    },
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
    <div className={styles.adoptPageContainer}>
      <div className={styles.filtersContainer}>
        <TopFilters
          topFilters={topFilters}
          setTopFilters={handleWantDogChange}
        />
      </div>
      <div className={styles.animalsContainer}>
        {animals?.map((animal: Animal) => (
          <div onClick={() => openModal(animal)}>
            <AnimalCard key={animal.id} animal={animal} />
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        {animalsCount > 9 ? (
          <Pagination
            count={getNumberOfPages(animalsCount)}
            page={topFilters.page}
            onChange={(event, value) => {
              setTopFilters((prevFilters) => ({
                ...prevFilters,
                page: value,
              }));
            }}
          />
        ) : (
          <></>
        )}
        {animalsCount === 0 ? (
          <div>No available animals that match that criteria</div>
        ) : (
          <></>
        )}
      </div>
      <ViewAnimalModal modalState={open} onClose={onCloseModal} />
    </div>
  );
};

export default Adopt;
