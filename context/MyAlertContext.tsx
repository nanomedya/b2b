import React, { createContext, ReactNode, useContext } from "react";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AlertContextType {
  showAlert: (title: string, message: string, options?: ToastOptions) => void;
}

const MyAlertContext = createContext<AlertContextType | undefined>(undefined);

export const useMyAlert = (): AlertContextType => {
  const context = useContext(MyAlertContext);
  if (!context) {
    throw new Error("useMyAlert must be used within a MyAlertProvider");
  }
  return context;
};

export const MyAlertProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const showAlert = (
    title: string,
    message: string,
    options?: ToastOptions
  ) => {
    toast(`${title}: ${message}`, options);
  };

  return (
    <MyAlertContext.Provider value={{ showAlert }}>
      {children}
      <ToastContainer />
    </MyAlertContext.Provider>
  );
};
