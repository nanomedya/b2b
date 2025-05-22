import React from "react";
import { useMyAlert } from "@/context/MyAlertContext";
import { ToastOptions } from "react-toastify";

interface MyAlertProps {
  title: string;
  message: string;
  options?: ToastOptions;
}

const MyAlert: React.FC<MyAlertProps> = ({ title, message, options }) => {
  const { showAlert } = useMyAlert();

  React.useEffect(() => {
    showAlert(title, message, options);
  }, [title, message, options, showAlert]);

  return null; // Bu bileşen sadece uyarıları gösterecek
};

export default MyAlert;
