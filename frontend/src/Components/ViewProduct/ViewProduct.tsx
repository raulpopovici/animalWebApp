import styles from "./ViewProduct.module.css";
import { useLocation } from "react-router-dom";
import { IProduct } from "../../Interfaces/FoodPageInterfaces";
import { Button, SnackbarOrigin } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import purina from "../../../Assets/purina.png";
import { useState } from "react";
import React from "react";
import Slide, { SlideProps } from "@mui/material/Slide";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { State } from "../../Pages/Food/Food";
import SnackbarV2 from "../Snackbar/Snackbar";
import { useAuthState } from "../../Context/AuthContext";
import { handleAddToCart } from "../../Pages/Cart/CartController";

const ViewProduct = ({ toggleCartState }: { toggleCartState: () => void }) => {
  const location = useLocation();
  const user = useAuthState();
  const product: IProduct = location.state.product;
  const [productQuantity, setProductQuantity] = useState(1);
  const integerPart = Math.trunc(product.price);
  const decimalPart = (product.price - integerPart).toFixed(2).slice(1);

  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "bottom",
    horizontal: "right",
    text: "",
  });

  const handleOpenAlert = (text: string) => {
    setState({ ...state, open: true, text: text });
  };

  const changeQuantity = (isIncrease: boolean) => {
    if (!isIncrease) {
      if (productQuantity - 1 !== 0) {
        setProductQuantity(productQuantity - 1);
      }
    } else {
      setProductQuantity(productQuantity + 1);
    }
  };

  const handleAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      await handleAddToCart(
        toggleCartState,
        product,
        productQuantity,
        false,
        user.user.cartId,
        user.isAuth
      )
    ) {
      handleOpenAlert("Product added to cart!");
    } else {
      handleOpenAlert("Cannot add product to cart!");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.middlePageContainer}>
        <div className={styles.middlePageProductContainer1}>
          <div className={styles.middlePageProductContainerColumn1}>
            <img
              style={{ height: "500px", width: "500px" }}
              src={product.image}
            />
          </div>
          <div className={styles.middlePageProductContainerColumn2}>
            <div className={styles.middlePageProductContainerColumn2Row1}>
              {product.name + ", " + product.productWeight + "g"}
            </div>

            <div className={styles.middlePageProductContainerColumn2Row2}>
              <div className={styles.productShortDescription}>Brand</div>
              <div className={styles.productShotDescriptionValue}>
                {product.brand}
              </div>
              <div className={styles.productShortDescription}>For</div>
              <div className={styles.productShotDescriptionValue}>
                {product.animalType}
              </div>
              <div className={styles.productShortDescription}>With</div>
              <div className={styles.productShotDescriptionValue}>
                {product.taste}
              </div>
            </div>

            <div className={styles.middlePageProductContainerColumn2Row3}>
              <div className={styles.priceText}>${integerPart}</div>
              <div className={styles.priceDecimalPart}>{decimalPart}</div>
            </div>
            <div className={styles.middlePageProductContainerColumn2Row4}>
              <div className={styles.incrementNrOfProducts}>
                <RemoveIcon
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                    },
                    color: "#ada26f",
                  }}
                  onClick={() => changeQuantity(false)}
                />
                <div
                  style={{
                    color: "#ada26f",
                    fontFamily: "Open Sans, sans-serif",
                    fontSize: "20px",
                  }}
                >
                  {productQuantity}
                </div>

                <AddIcon
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                    },
                    color: "#ada26f",
                  }}
                  fontSize="medium"
                  onClick={() => changeQuantity(true)}
                />
              </div>
            </div>
            <div className={styles.middlePageProductContainerColumn2Row5}>
              <Button
                variant="contained"
                onClick={(e) => handleAdd(e)}
                sx={{
                  height: "50px",
                  width: "300px",
                  bgcolor: "#364a59",
                  fontFamily: "Open Sans, sans-serif",
                  "&:hover": {
                    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                    cursor: "pointer",
                    bgcolor: "#4b5e6c",
                  },
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <ShoppingCartIcon />
                ADD TO CART
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.middlePageProductContainer2}>
          <div className={styles.middlePageProductContainer2Decription}>
            <div className={styles.middlePageProductContainer2TitleRows}>
              Description
            </div>
            <div className={styles.middlePageProductContainer2TextRows}>
              {product.description}
            </div>
          </div>
          <div>
            <div className={styles.middlePageProductContainer2TitleRows}>
              Composition
            </div>
            <div className={styles.middlePageProductContainer2TextRows}>
              {product.composition}
            </div>
          </div>
          <div
            className={styles.middlePageProductContainer2NutritionalAdditives}
          >
            <div className={styles.middlePageProductContainer2TitleRows}>
              Nutritional Additives
            </div>
            <div className={styles.middlePageProductContainer2TextRows}>
              {product.nutritionalAdditives}
            </div>
          </div>
          <div
            className={styles.middlePageProductContainer2AnalyticalConstituents}
          >
            <div className={styles.middlePageProductContainer2TitleRows}>
              Analytical Constituents
            </div>
            <div className={styles.middlePageProductContainer2TextRows}>
              {product.analyticalConstituents}
            </div>
          </div>
        </div>
      </div>
      <SnackbarV2 state={state} setState={(state: State) => setState(state)} />
    </div>
  );
};

export default ViewProduct;
