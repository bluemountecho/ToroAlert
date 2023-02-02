import { useState, useEffect, useCallback } from "react";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [dealsIn, setDealsIn] = useState(null);
  const [isApiKeyValidated, setApiKeyValidated] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState(null);

  const apiKeyValidated = useCallback((validated) => {
    setApiKeyValidated(validated);
    const user = JSON.parse(localStorage.getItem("userData"));
    localStorage.setItem(
      "userData",
      JSON.stringify({ ...user, apiKeyValidated: validated })
    );
  }, []);

  const dealingIn = useCallback((type) => {
    setDealsIn(type);
    const user = JSON.parse(localStorage.getItem("userData"));
    localStorage.setItem(
      "userData",
      JSON.stringify({ ...user, currentlyDealingIn: type })
    );
  }, []);

  const login = useCallback((userData, token, expirationDate) => {
    setToken(token);
    setUser(userData);

    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 24);

    setTokenExpirationDate(tokenExpirationDate);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        user: userData,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUser(null);
    setApiKeyValidated(false);
    setDealsIn(null);

    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpirationDate, logout]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.user, storedData.token, new Date(storedData.expiration));
    }

    if (storedData && storedData.apiKeyValidated) {
      apiKeyValidated(storedData.apiKeyValidated);
    }
    if (storedData && storedData.currentlyDealingIn) {
      dealingIn(storedData.currentlyDealingIn);
    }
  }, [login, apiKeyValidated, dealingIn]);

  return {
    token,
    login,
    logout,
    user,
    dealingIn,
    dealsIn,
    apiKeyValidated,
    isApiKeyValidated,
  };
};
