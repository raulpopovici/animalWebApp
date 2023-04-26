import { newFirstnameUpdate } from "./RegisterReducer";

export const handleRegisterErrors = (errorData: any) => {
  const { firstName, lastName, email, password, confirmPassword } = errorData;
};
