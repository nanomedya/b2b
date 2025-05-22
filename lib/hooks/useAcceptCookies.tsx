import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const COOKIE_NAME = "accept_cookies";

interface UseAcceptCookies {
  acceptedCookies: boolean;
  onAcceptCookies: () => void;
}

export const useAcceptCookies = (): UseAcceptCookies => {
  const [acceptedCookies, setAcceptedCookies] = useState<boolean>(true);

  useEffect(() => {
    if (!Cookies.get(COOKIE_NAME)) {
      setAcceptedCookies(false);
    }
  }, []);

  const acceptCookies = () => {
    setAcceptedCookies(true);
    Cookies.set(COOKIE_NAME, "accepted", { expires: 365 });
  };

  return {
    acceptedCookies,
    onAcceptCookies: acceptCookies,
  };
};
