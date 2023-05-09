import {
  Alert,
  Button,
  Card,
  CardContent,
  CardMedia,
  SnackbarOrigin,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import purina from "../../Assets/purina.png";
import { IProduct } from "../../Interfaces/FoodPageInterfaces";
import styles from "./Card.module.css";
import { handleAddToCart } from "../../Pages/Cart/CartController";
import { useAuthState } from "../../context/AuthContext";

export const CardComponent = ({
  product,
  toggleCartState,
  handleOpenAlert,
}: {
  product: IProduct;
  toggleCartState: () => void;
  handleOpenAlert: (text: string) => void;
}) => {
  const navigate = useNavigate();
  const integerPart = Math.trunc(product.price);
  const decimalPart = (product.price - integerPart).toFixed(2).slice(1);
  const [showButton, setShowButton] = useState(false);

  const user = useAuthState();

  const handleMouseEnter = () => {
    setShowButton(true);
  };
  const handleMouseOut = () => {
    setShowButton(false);
  };

  const handleAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      await handleAddToCart(
        toggleCartState,
        product,
        1,
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
    <Card
      sx={{
        width: "250px",
        height: "300px",
        transition: "box-shadow 0.2s",
        "&:hover": {
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
          cursor: "pointer",
        },
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseOut}
      onClick={() =>
        navigate(`/food/${product.name.replaceAll(" ", "-")}`, {
          state: { product },
        })
      }
    >
      <CardMedia
        component="img"
        sx={{ height: "200px", width: "200px" }}
        image={product.image}
        alt="Paella dish"
      />
      <CardContent>
        <div className={styles.cardText}>
          {product.name} , {product.productWeight + "g"}
        </div>
        <div
          style={{ display: "flex", flexDirection: "row", marginTop: "10px" }}
        >
          <div className={styles.priceText}>${integerPart}</div>
          <div className={styles.priceDecimalPart}>{decimalPart}</div>
        </div>
      </CardContent>
      {showButton && (
        <Button
          variant="contained"
          sx={{
            position: "relative",
            top: "-150px",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "#82218b",
            "&:hover": {
              boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
              cursor: "pointer",
              bgcolor: "#4a5f98",
            },
          }}
          onClick={(e) => handleAdd(e)}
        >
          <div className={styles.addToCartText}>ADD TO CART</div>
        </Button>
      )}
    </Card>
  );
};
