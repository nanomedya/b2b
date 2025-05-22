// src/context/AuthContext.tsx
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextProps {
  loading: boolean;
  token: string | null;
  user: any | null;
  currentBasketId: number | null;
  setUser: (user: any | null) => void;
  setCurrentBasketId: (user: any | null) => void;
  setToken: (token: string | null) => void;
  setLogout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUserState] = useState<any | null>(null);
  const [currentBasketId, setCurrentBasketIdState] = useState<any | null>(null);

  const setToken = (newToken: string | null) => {
    if (typeof window !== 'undefined') {
      if (newToken) {
        window.localStorage.setItem("authToken", newToken);
      } else {
        window.localStorage.removeItem("authToken");
      }
    }
    setTokenState(newToken);
  };

  const setUser = (newUser: any | null) => {
    if (typeof window !== 'undefined') {
      if (newUser) {
        window.localStorage.setItem("authUser", JSON.stringify(newUser));
      } else {
        window.localStorage.removeItem("authUser");
      }
    }
    setUserState(newUser);
  };

  const setCurrentBasketId = (newCurrentBasketId: any | null) => {
    if (typeof window !== 'undefined') {
      if (newCurrentBasketId) {
        window.localStorage.setItem("currentBasketId", JSON.stringify(newCurrentBasketId));
      } else {
        window.localStorage.removeItem("currentBasketId");
      }
    }
    setCurrentBasketIdState(newCurrentBasketId);
  };

  const setLogout = () => {
    setToken(null);
    setUser(null);
    setCurrentBasketId(null);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentBasketId = window.localStorage.getItem("currentBasketId");
      const storedToken = window.localStorage.getItem("authToken");
      const storedUser = window.localStorage.getItem("authUser");

      if (storedToken && storedUser) {
        setTokenState(storedToken);
        setUserState(JSON.parse(storedUser));
        setCurrentBasketIdState(Number(currentBasketId));
      } else {
        setLogout();
      }
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ loading, user, currentBasketId, token, setUser, setToken, setLogout, setCurrentBasketId }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
