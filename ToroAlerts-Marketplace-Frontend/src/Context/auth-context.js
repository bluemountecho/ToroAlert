import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  isApiKeyValidated: false,
  user: null,
  token: null,
  dealsIn: null,
  login: () => {},
  logout: () => {},
  apiKeyValidated: () => {},
  dealingIn: () => {},
});
