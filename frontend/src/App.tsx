import React from "react";
import { AppRoutes } from "./AppRoutes";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  // return <Login></Login>;
  return (
    <AuthProvider>
      <Router>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
        </QueryClientProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
