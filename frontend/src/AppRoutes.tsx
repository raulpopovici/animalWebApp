import React, { Suspense, lazy, useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "./Components/Nav/Nav";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { IProduct } from "./Interfaces/FoodPageInterfaces";
import {
  ICartProduct,
  initialCartProduct,
} from "./Interfaces/CartPageInterfaces";
import { useAuthState } from "./context/AuthContext";
import axios from "axios";

const Login = lazy(() => import("./Pages/Login/Login"));
const Register = lazy(() => import("./Pages/Register/Register"));
const Home = lazy(() => import("./Pages/Home/Home"));
const Food = lazy(() => import("./Pages/Food/Food"));
const ViewProduct = lazy(() => import("./Pages/Food/ViewProduct/ViewProduct"));
const Cart = lazy(() => import("./Pages/Cart/Cart"));
const CheckoutSuccess = lazy(() => import("./Pages/Checkout/CheckoutSuccess"));
const Profile = lazy(() => import("./Pages/Profile/Profile"));
const Adopt = lazy(() => import("./Pages/Adopt/Adopt"));
const FindMate = lazy(() => import("./Pages/FindMate/FindMate"));

export const AppRoutes = () => {
  const location = useLocation();

  const [cartSize, setCartSize] = useState(0);
  const [cartState, setCartState] = useState(false);
  const [cartData, setCartData] = useState<ICartProduct[]>([]);

  const user = useAuthState();
  //   const location = useLocation();

  const toggleCartState = () => {
    setCartState(!cartState);
  };

  const { data: cartProducts, refetch } = useQuery(
    ["cartProducts"],
    async () => {
      const response = await axios.get("/getproductsfromcart");
      return response.data;
    },
    {
      initialData: [],
    }
  );

  useEffect(() => {
    refetch();
  }, [cartState, refetch]);

  useEffect(() => {
    let cart: ICartProduct[] = [];
    if (user.isAuth) {
      //if user is authenticated get cart from database and set cart size
      let totalQuantity = 0;

      console.log(cartProducts);
      totalQuantity = cartProducts.reduce(
        (acumulator: any, currentValue: any) =>
          acumulator + currentValue.quantity,
        0
      );
      setCartSize(totalQuantity);
    } else {
      let data = localStorage.getItem("cart");
      if (data) {
        cart = JSON.parse(data) as ICartProduct[];
        const totalQuantity = cart.reduce(
          (acumulator, currentValue) => acumulator + currentValue.quantity,
          0
        );
        setCartSize(totalQuantity);
      } else {
        cart = [];
      }
      setCartData(cart);
    }
  }, [cartState, user.isAuth, cartProducts]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {location.pathname === "/register" || location.pathname === "/login" ? (
        <></>
      ) : (
        <Nav cartSize={cartSize} />
      )}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/food"
          element={<Food toggleCartState={toggleCartState} />}
        />
        <Route
          path="/food/:productName"
          element={<ViewProduct toggleCartState={toggleCartState} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              data={user.isAuth ? cartProducts : cartData}
              toggleCartState={toggleCartState}
            />
          }
        />
        <Route
          path="/checkout-success"
          element={<CheckoutSuccess toggleCartState={toggleCartState} />}
        />

        <Route path="/profile" element={<Profile />} />
        <Route path="/adopt" element={<Adopt />} />
        <Route path="/find-mate" element={<FindMate />} />
      </Routes>
    </Suspense>
  );
};
