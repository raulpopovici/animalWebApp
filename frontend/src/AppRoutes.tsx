import React, { Suspense, lazy, useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "./Components/Nav/Nav";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IProduct } from "./Interfaces/FoodPageInterfaces";
import { ICartProduct } from "./Interfaces/CartPageInterfaces";

const Login = lazy(() => import("./Pages/Login/Login"));
const Register = lazy(() => import("./Pages/Register/Register"));
const Home = lazy(() => import("./Pages/Home/Home"));
const Food = lazy(() => import("./Pages/Food/Food"));
const ViewProduct = lazy(() => import("./Pages/Food/ViewProduct/ViewProduct"));
const Cart = lazy(() => import("./Pages/Cart/Cart"));

const queryClient = new QueryClient();

export const AppRoutes = () => {
  const location = useLocation();

  const [cartSize, setCartSize] = useState(0);
  const [cartState, setCartState] = useState(false);
  //   const location = useLocation();

  const toggleCartState = () => {
    setCartState(!cartState);
  };

  useEffect(() => {
    let data = localStorage.getItem("cart");
    let cart;
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
  }, [cartState]);

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
          element={
            <QueryClientProvider client={queryClient}>
              <Food toggleCartState={toggleCartState} />
            </QueryClientProvider>
          }
        />
        <Route
          path="/food/:productName"
          element={<ViewProduct toggleCartState={toggleCartState} />}
        />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Suspense>
  );
};
