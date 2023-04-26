import React from "react";
import { AppRoutes } from "./AppRoutes";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

function App() {
  // return <Login></Login>;
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
