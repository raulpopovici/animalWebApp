import React, { useEffect, useState } from "react";
import styles from "./FindMate.module.css";
import SelectPetForMate from "./SelectPetForMate/SelectPetForMate";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress, Tooltip } from "@mui/joy";
import { useAuthState } from "../../Context/AuthContext";

const FindMate = () => {
  const [openCircularProgress, setOpenCircularProgress] = useState(false);

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

  const fetchPossibleMatches = (id: string) => {
    if (id === "") return;

    setOpenCircularProgress(true);

    try {
      console.log("fetching possible matches");
    } catch {
      console.log("error fetching possible matches");
    }

    const timer = setTimeout(() => {
      setOpenCircularProgress(false);
    }, 3000);
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
            <div>Animals</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindMate;
