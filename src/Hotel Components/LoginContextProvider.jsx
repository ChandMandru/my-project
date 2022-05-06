import React, { useCallback,useMemo,useState,createContext} from "react";

export const LoginContext = createContext(undefined);

export function LoginContextProvider({ children }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logIn = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logOut = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  const value = useMemo(
    () => ({
      isLoggedIn,
      logIn,
      logOut,
    }),
    [isLoggedIn]
  );


  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
}
