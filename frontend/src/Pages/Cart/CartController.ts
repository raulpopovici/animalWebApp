import axios from "axios";
import { ICartProduct } from "../../Interfaces/CartPageInterfaces";
import { IProduct } from "../../Interfaces/FoodPageInterfaces";

export const handleAddToCartLocalStorage = (
  toggleCartState: () => void,
  product: IProduct,
  nrOfProducts: number,
  wantDelete: boolean
) => {
  try {
    let data = localStorage.getItem("cart");
    let cart: ICartProduct[] = [];
    if (data) {
      cart = JSON.parse(data) as ICartProduct[];
    } else {
      cart = [];
    }

    if (wantDelete) {
      const filtered = cart.filter(function (el) {
        return el.product.id != product.id;
      });
      localStorage.setItem("cart", JSON.stringify(filtered));
    } else {
      const productInCart = cart.find((obj) => obj.product.id === product.id);
      if (productInCart) {
        productInCart.quantity = productInCart.quantity + nrOfProducts;
      } else {
        cart.push({ quantity: nrOfProducts, product: product });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    toggleCartState();
    // handleOpenAlert("Product added to cart!");
    return true;
  } catch {
    // handleOpenAlert("Cannot add product to cart!");
    return false;
  }
};

export const handleAddToCartDB = async (
  toggleCartState: () => void,
  product: IProduct,
  nrOfProducts: number,
  wantDelete: boolean,
  cartId: string
) => {
  try {
    if (wantDelete) {
      await axios.delete("/deleteproductfromcart", {
        data: {
          productId: product.id,
          cartId: cartId,
        },
      });
    } else {
      await axios.post("/postproductsincart", {
        productId: product.id,
        cartId: cartId,
        quantityModified: nrOfProducts,
      });
    }

    toggleCartState();
    return true;
  } catch {
    console.log("Error");
    return false;
  }
};

export const handleAddToCart = async (
  toggleCartState: () => void,
  product: IProduct,
  nrOfProducts: number,
  wantDelete: boolean,
  cartId: string,
  isUserLoggedIn: boolean
) => {
  if (isUserLoggedIn) {
    return await handleAddToCartDB(
      toggleCartState,
      product,
      nrOfProducts,
      wantDelete,
      cartId
    );
  } else {
    return handleAddToCartLocalStorage(
      toggleCartState,
      product,
      nrOfProducts,
      wantDelete
    );
  }
};
