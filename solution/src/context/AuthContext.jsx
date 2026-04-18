import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const value = {
    isLoggedIn,
    userName,
    login: (name) => {
      setUserName(name);
      setIsLoggedIn(true);
    },
    logout: () => {
      setUserName("");
      setIsLoggedIn(false);
    },
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}
