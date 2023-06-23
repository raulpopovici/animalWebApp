import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import axios from "axios";

type Action =
  | { type: "LOGIN"; payload: UserData }
  | { type: "LOGOUT" }
  | { type: "FirstName_UPDATE"; payload: string }
  | { type: "LastName_UPDATE"; payload: string }
  | { type: "PhoneNumber_UPDATE"; payload: string }
  | { type: "Address_UPDATE"; payload: string }
  | { type: "City_UPDATE"; payload: string }
  | { type: "Country_UPDATE"; payload: string };

export const initialAuthData: IAuthReducerData = {
  isAuth: false,
  user: {
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    city: "",
    country: "",
    cartId: "",
    isAdmin: false,
  },
};

interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
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
          phoneNumber: "",
          address: "",
          city: "",
          country: "",
          cartId: "",
          isAdmin: false,
        },
      };
    case "FirstName_UPDATE":
      return {
        ...state,
        user: {
          ...state.user,
          firstName: action.payload,
        },
      };
    case "LastName_UPDATE":
      return {
        ...state,
        user: {
          ...state.user,
          lastName: action.payload,
        },
      };
    case "PhoneNumber_UPDATE":
      return {
        ...state,
        user: {
          ...state.user,
          phoneNumber: action.payload,
        },
      };
    case "Address_UPDATE":
      return {
        ...state,
        user: {
          ...state.user,
          address: action.payload,
        },
      };
    case "City_UPDATE":
      return {
        ...state,
        user: {
          ...state.user,
          city: action.payload,
        },
      };
    case "Country_UPDATE":
      return {
        ...state,
        user: {
          ...state.user,
          country: action.payload,
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
          dispatch({
            type: "LOGIN",
            payload: {
              id: res.data.id,
              email: res.data.email,
              firstName: res.data.firstName,
              lastName: res.data.lastName,
              phoneNumber: res.data.phoneNumber,
              address: res.data.address,
              city: res.data.city,
              country: res.data.country,
              cartId: res.data.cartId,
              isAdmin: res.data.isAdmin,
            },
          });
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
