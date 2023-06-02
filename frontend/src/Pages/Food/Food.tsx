import React, { useEffect, useReducer } from "react";
import styles from "./Food.module.css";
import SearchBar from "../../Components/SearchBar/SearchBar";
import { foodReducer, FoodState, initialFoodData } from "./FoodReducer";
import TopFilters from "../../Components/FoodFilters/TopFilters";
import LeftPriceFilters from "../../Components/FoodFilters/LeftPriceFilters";
import LeftAvailabilityFilters from "../../Components/FoodFilters/LeftAvailabilityFilters";
import LeftBrandFilters from "../../Components/FoodFilters/LeftBrandFilters";
import LeftAgeFilters from "../../Components/FoodFilters/LeftAgeFilters";
import LeftTasteFilters from "../../Components/FoodFilters/LeftTasteFilters";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IconButton, Pagination } from "@mui/material";
import { CardComponent } from "../../Components/Card/Card";
import { IProduct } from "../../Interfaces/FoodPageInterfaces";
import { getNumberOfPages } from "./FoodController";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import Slide, { SlideProps } from "@mui/material/Slide";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import SnackbarV2 from "../../Components/Snackbar/Snackbar";

export interface State extends SnackbarOrigin {
  open: boolean;
  text: string;
}

const Food = ({ toggleCartState }: { toggleCartState: () => void }) => {
  const [foodReducerData, dispatchFoodReducerData] = useReducer(
    foodReducer,
    initialFoodData
  );
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "bottom",
    horizontal: "right",
    text: "",
  });

  const handleOpenAlert = (text: string) => {
    setState({ ...state, open: true, text: text });
  };

  const { data: products, refetch } = useQuery(["products"], async () => {
    const response = await axios.get("/getproducts", {
      params: {
        animalType: foodReducerData.topFilters,
        availability: foodReducerData.leftFilters.availability,
        priceRange: foodReducerData.leftFilters.price,
        brand: foodReducerData.leftFilters.brand,
        animalAge: foodReducerData.leftFilters.age,
        taste: foodReducerData.leftFilters.taste,
        searchText: foodReducerData.searchBar,
        pageNumber: foodReducerData.pageNumber,
      },
    });
    return response.data;
  });

  const { data: productsCount, refetch: refetchCount } = useQuery(
    ["productsCount"],
    async () => {
      const response = await axios.get("/getnrofproducts", {
        params: {
          animalType: foodReducerData.topFilters,
          availability: foodReducerData.leftFilters.availability,
          priceRange: foodReducerData.leftFilters.price,
          brand: foodReducerData.leftFilters.brand,
          animalAge: foodReducerData.leftFilters.age,
          taste: foodReducerData.leftFilters.taste,
          searchText: foodReducerData.searchBar,
        },
      });
      return response.data;
    }
  );

  useEffect(() => {
    refetch();
    refetchCount();
  }, [foodReducerData, refetch, refetchCount]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.middlePageContainer}>
        <div className={styles.middlePageHeaderContainer}>
          <div className={styles.middlePageHeaderSearchBarContainer}>
            <SearchBar
              text={foodReducerData.searchBar}
              dispatchFoodReducerData={dispatchFoodReducerData}
            />
          </div>
          <div className={styles.middlePageHeaderFiltersContainer}>
            <TopFilters
              topFilters={foodReducerData.topFilters}
              dispatchFoodReducerData={dispatchFoodReducerData}
            />
          </div>
        </div>
        <div className={styles.middlePageProductsContainer}>
          <div className={styles.middlePageLeftFilters}>
            <div className={styles.middlePageLeftFiltersRow1}>
              <div className={styles.filterDescText}>Availability</div>
              <LeftAvailabilityFilters
                leftFilters={foodReducerData.leftFilters}
                dispatchFoodReducerData={dispatchFoodReducerData}
              />
            </div>

            <div className={styles.middlePageLeftFiltersRow2}>
              <div className={styles.filterDescText}> Price ($)</div>
              <LeftPriceFilters
                leftFilters={foodReducerData.leftFilters}
                dispatchFoodReducerData={dispatchFoodReducerData}
              />
            </div>

            <div className={styles.middlePageLeftFiltersRow3}>
              <div className={styles.filterDescText}>Brand</div>
              <LeftBrandFilters
                leftFilters={foodReducerData.leftFilters}
                dispatchFoodReducerData={dispatchFoodReducerData}
              />
            </div>

            <div className={styles.middlePageLeftFiltersRow4}>
              <div className={styles.filterDescText}> Age</div>
              <LeftAgeFilters
                leftFilters={foodReducerData.leftFilters}
                dispatchFoodReducerData={dispatchFoodReducerData}
              />
            </div>

            <div className={styles.middlePageLeftFiltersRow5}>
              <div className={styles.filterDescText}>Taste</div>
              <LeftTasteFilters
                leftFilters={foodReducerData.leftFilters}
                dispatchFoodReducerData={dispatchFoodReducerData}
              />
            </div>
          </div>
          <div className={styles.middlePage}>
            <div className={styles.middlePageProducts}>
              {products?.map((product: IProduct) => (
                <CardComponent
                  key={product.id}
                  product={product}
                  toggleCartState={toggleCartState}
                  handleOpenAlert={handleOpenAlert}
                />
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Pagination
                count={getNumberOfPages(productsCount)}
                page={foodReducerData.pageNumber}
                onChange={(event, value) =>
                  dispatchFoodReducerData({
                    type: FoodState.pageNumber,
                    payload: value,
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
      <SnackbarV2 state={state} setState={(state: State) => setState(state)} />
    </div>
  );
};

export default Food;
