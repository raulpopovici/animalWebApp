import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import axios from "axios";

type Action = { type: "LOGIN"; payload: UserData } | { type: "LOGOUT" };

export const initialAuthData: IAuthReducerData = {
  isAuth: false,
  user: {
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    cartId: "",
    isAdmin: false,
  },
};

interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  cartId: string;
  isAdmin: boolean;
}

interface IAuthReducerData {
  isAuth: boolean;
  user: UserData;
}

const StateContext = createContext(initialAuthData);

export const DispatchContext = createContext<Dispatch<Action> | null>(null);

const authReducer = (
  state: IAuthReducerData,
  action: Action
): IAuthReducerData => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuth: true,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuth: false,
        user: {
          id: "",
          email: "",
          firstName: "",
          lastName: "",
          cartId: "",
          isAdmin: false,
        },
      };
    default:
      const invalidAction: never = action;
      throw new Error(`Unknown action type: ${invalidAction}`);
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthData);

  useEffect(() => {
    axios
      .get("/me")
      .then((res) => {
        if (res.data) {
          dispatch({ type: "LOGIN", payload: res.data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);
